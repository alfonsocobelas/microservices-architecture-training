/* eslint-disable @typescript-eslint/no-explicit-any */
import * as amqplib from 'amqplib'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RabbitMqConfig } from '../../config/env.types'
import { RabbitMQExchangeNameFormatter } from './rabbitmq-exchange-name-formatter'

type ConfirmChannel = amqplib.ConfirmChannel
type Connection = amqplib.ChannelModel
type ConsumeMessage = amqplib.ConsumeMessage

@Injectable()
export class RabbitMqConnection {
  private readonly config: RabbitMqConfig
  private connection?: Connection
  private channel?: ConfirmChannel

  constructor(private readonly configService: ConfigService) {
    const config = this.configService.get<RabbitMqConfig>('rabbitmq')

    if (!config) {
      throw new Error('RabbitMQ configuration not found')
    }

    this.config = config
  }

  async start() {
    this.connection = await this.amqpConnect()
    this.channel = await this.amqpChannel()
  }

  async close(): Promise<void> {
    await this.channel?.close()
    await this.connection?.close()
  }

  ack(message: ConsumeMessage) {
      this.channel!.ack(message)
  }

  noAck(message: ConsumeMessage) {
      this.channel!.nack(message)
  }

  async exchange(params: { exchangeName: string, type?: string }) {
    const { exchangeName, type = 'topic' } = params

    await this.channel!.assertExchange(exchangeName, type, { durable: true })
  }

  async queue(params: {
    queueName: string,
    messageTtl?: number,
    deadLetterExchange?: string,
    deadLetterQueue?: string
  }) {
    const { queueName, messageTtl, deadLetterExchange, deadLetterQueue } = params
    const options = this.getQueueOptions({ messageTtl, deadLetterExchange, deadLetterQueue })

    await this.channel!.assertQueue(queueName, options)
  }

  async retry(message: amqplib.ConsumeMessage, queue: string, exchange: string) {
    const retryExchange = RabbitMQExchangeNameFormatter.retry(exchange)
    const options = this.getMessageOptions(message)

    return await this.publish({ exchange: retryExchange, routingKey: queue, content: message.content, options })
  }

  async deadLetter(message: ConsumeMessage, queue: string, exchange: string) {
    const deadLetterExchange = RabbitMQExchangeNameFormatter.deadLetter(exchange)
    const options = this.getMessageOptions(message)

    return await this.publish({ exchange: deadLetterExchange, routingKey: queue, content: message.content, options })
  }

  async bindQueue(params: { queueName: string, exchange: string, routingKeys: string[] }) {
    const { queueName, exchange, routingKeys } = params

    for (const routingKey of routingKeys) {
      await this.channel!.bindQueue(queueName, exchange, routingKey)
    }
  }

  async purgeQueue(queueName: string) {
    await this.channel!.purgeQueue(queueName)
  }

  async getChannel(): Promise<ConfirmChannel | undefined> {
    return this.channel
  }

  async publish(params: {
    exchange?: string
    routingKey: string
    content: Buffer
    options: { messageId: string; contentType: string; contentEncoding: string }
  }): Promise<boolean> {
    const { routingKey, content, options } = params
    const exchange = params.exchange ?? this.config.exchangeSettings.name.default

    return new Promise((resolve: Function, reject: Function) => {
      this.channel!.publish(exchange, routingKey, content, options, (error: any) => (error ? reject(error) : resolve()))
    })
  }

  async consume(queue: string, onMessage: (message: amqplib.ConsumeMessage) => {}) {
    await this.channel!.consume(queue, (message: amqplib.ConsumeMessage | null) => {
      if (!message) {
        return
      }
      onMessage(message)
    })
  }

  private async amqpChannel(): Promise<ConfirmChannel> {
    if (this.channel) {
      return this.channel
    }
    const connection = await this.amqpConnect()
    this.channel = await connection.createConfirmChannel()
    this.channel.prefetch(1) // Process one message at a time, avoid parallel
    this.channel.on('error', () => { this.channel = undefined })
    this.channel.on('close', () => { this.channel = undefined })

    return this.channel
  }

  private async amqpConnect(): Promise<Connection> {
    if (this.connection) {
      return this.connection
    }

    const { username, password, vhost } = this.config.connectionSettings
    const { hostname, port, secure } = this.config.connectionSettings.connection
    const protocol = secure ? 'amqps' : 'amqp'

    this.connection = await amqplib.connect({ protocol, hostname, port, username, password, vhost })
    this.connection.on('error', () => { this.connection = undefined })
    this.connection.on('close', () => { this.connection = undefined })

    return this.connection
  }

  private getQueueOptions(params: { messageTtl?: number, deadLetterExchange?: string, deadLetterQueue?: string }) {
    const options = {
      durable: true,
      exclusive: false,
      autoDelete: false,
      arguments: {} as any
    }

    if (params.deadLetterExchange) {
      options.arguments['x-dead-letter-exchange'] = params.deadLetterExchange
    }
    if (params.deadLetterQueue) {
      options.arguments['x-dead-letter-routing-key'] = params.deadLetterQueue
    }
    if (params.messageTtl) {
      options.arguments['x-message-ttl'] = params.messageTtl
    }

    return options
  }

  private getMessageOptions(message: ConsumeMessage) {
    const { messageId, contentType, contentEncoding, priority } = message.properties
    const options = {
      messageId,
      headers: this.incrementRedeliveryCount(message),
      contentType,
      contentEncoding,
      priority
    }
    return options
  }

  private incrementRedeliveryCount(message: ConsumeMessage) {
    if (!message.properties.headers) {
      message.properties.headers = {}
    }

    if (this.hasBeenRedelivered(message)) {
      const count = parseInt(message.properties.headers['redelivery_count'])
      message.properties.headers['redelivery_count'] = count + 1
    } else {
      message.properties.headers['redelivery_count'] = 1
    }

    return message.properties.headers
  }

  private hasBeenRedelivered(message: ConsumeMessage) {
    return message.properties.headers?.['redelivery_count'] !== undefined
  }
}

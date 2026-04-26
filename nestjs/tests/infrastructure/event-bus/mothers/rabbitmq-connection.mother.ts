// import { RabbitMqConnection } from 'src/contexts/shared/infrastructure/event-bus/rabbitmq/rabbitmq-connection'
// import { RabbitMQConnectionConfigurationMother } from './rabbitmq-connection-configuration.mother'

// export class RabbitMQConnectionMother {
//   static async create() {
//     const config = RabbitMQConnectionConfigurationMother.create()
//     const connection = new RabbitMqConnection(config)
//     await connection.start()
//     return connection
//   }

//   static failOnPublish() {
//     return new RabbitMQConnectionDouble(RabbitMQConnectionConfigurationMother.create())
//   }
// }

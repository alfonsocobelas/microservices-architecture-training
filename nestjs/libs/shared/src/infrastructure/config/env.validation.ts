import { plainToInstance, Type } from 'class-transformer'
import { IsString, IsNumber, IsBoolean, ValidateNested, validateSync } from 'class-validator'

export function validate(config: Record<string, unknown>): RootValidator {
  const validatedConfig = plainToInstance(RootValidator, config)
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length) {
    throw new Error(`Config validation failed: ${errors.toString()}`)
  }

  return validatedConfig
}

class ConnectionValidator {
  @IsBoolean()
    secure!: boolean
  @IsString()
    hostname!: string
  @IsNumber()
    port!: number
}

class ExchangeNameValidator {
  @IsString()
    default!: string
}

class PrefetchCountValidator {
  @IsNumber()
    default!: number
}

class MaxRetriesValidator {
  @IsNumber()
    default!: number
}

class RetryTTLValidator {
  @IsNumber()
    default!: number
}

class RetrySettingsValidator {
  @ValidateNested() @Type(() => MaxRetriesValidator)
    maxRetries!: MaxRetriesValidator
  @ValidateNested() @Type(() => RetryTTLValidator)
    retryTTL!: RetryTTLValidator
}

class QueueSettingsValidator {
  @ValidateNested() @Type(() => RetrySettingsValidator)
    retry!: RetrySettingsValidator
}
class ConsumerSettingsValidator {
  @ValidateNested() @Type(() => PrefetchCountValidator)
    prefetchCount!: PrefetchCountValidator
}

class ExchangeSettingsValidator {
  @ValidateNested() @Type(() => ExchangeNameValidator)
    name!: ExchangeNameValidator
}

class ConnectionSettingsValidator {
  @IsString()
    username!: string
  @IsString()
    password!: string
  @IsString()
    vhost!: string
  @ValidateNested() @Type(() => ConnectionValidator)
    connection!: ConnectionValidator
}

class RabbitMqValidator {
  @ValidateNested() @Type(() => ConnectionSettingsValidator)
    connectionSettings!: ConnectionSettingsValidator
  @ValidateNested() @Type(() => ExchangeSettingsValidator)
    exchangeSettings!: ExchangeSettingsValidator
  @ValidateNested() @Type(() => ConsumerSettingsValidator)
    consumerSettings!: ConsumerSettingsValidator
  @ValidateNested() @Type(() => QueueSettingsValidator)
    queueSettings!: QueueSettingsValidator
}

class RootValidator {
  @ValidateNested() @Type(() => RabbitMqValidator)
    rabbitmq!: RabbitMqValidator
}

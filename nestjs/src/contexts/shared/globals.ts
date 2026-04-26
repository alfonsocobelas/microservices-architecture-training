import { RabbitMqConfig, TypeORMConfig } from 'src/contexts/shared/infrastructure/config/env.types'

declare global {
  namespace NestJS {
    interface Config {
      app: {
        env: string;
        port: number;
      };
      database: TypeORMConfig;
      eventBus: RabbitMqConfig;
    }
  }
}

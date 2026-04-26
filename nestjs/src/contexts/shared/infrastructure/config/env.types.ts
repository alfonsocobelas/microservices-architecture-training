export interface AppConfig {
  env: string;
  port: number;
  typeorm: TypeORMConfig;
}

export interface TypeORMConfig {
  type: string
  host: string
  port: number
  username: string
  password: string
  database: string
  synchronize: boolean
  dropSchema: boolean
  logging: boolean
  autoLoadEntities: boolean
  migrationsTransactionMode: string
  migrationsRun: boolean
}

export interface RabbitMqConfig {
  connectionSettings: {
    username: string;
    password: string;
    secure: boolean;
    vhost: string;
    connection: {
      secure: boolean;
      hostname: string;
      port: number;
    }
  };
  exchangeSettings: {
    name: {
      default: string;
    }
  };
  consumerSettings: {
    prefetchCount: {
      default: number;
    }
  };
  queueSettings: {
    retry: {
      maxRetries: {
        default: number;
      };
      retryTTL: {
        default: number;
      };
    }
  };
}

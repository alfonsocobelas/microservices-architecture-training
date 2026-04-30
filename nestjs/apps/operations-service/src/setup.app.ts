import helmet from 'helmet'
import compression from 'compression'
import { Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ClassSerializerInterceptor, INestApplication, ValidationPipe, VersioningType } from '@nestjs/common'
import { GlobalExceptionFilter } from './modules/shared/infrastructure/filters/http-exception.filter'

export function setupApp(app: INestApplication | NestExpressApplication) {
  app.use(helmet())
  app.use(compression())
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization'
  })
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  )
  app.useGlobalFilters(
    new GlobalExceptionFilter()
  )
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: process.env.NODE_ENV === 'prod'
    })
  )

  return app
}

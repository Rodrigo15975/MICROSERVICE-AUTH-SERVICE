import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      host: 'localhost',
      port: 6379,
    },
    transport: Transport.REDIS,
  })

  const config = new DocumentBuilder()
    .setTitle('Documentación de Microservicio Auth Service')
    .setDescription('API de MICROSERSERVICIOS AUTH SERVICE')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('microservice-auth-service', app, document)

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
  await app.startAllMicroservices()
  await app.listen(4003)
}
bootstrap()

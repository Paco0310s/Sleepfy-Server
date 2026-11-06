import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir apps móviles/escritorio (sin origin), localhost y dominios pacosotelo.com
      if (
        !origin ||
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ||
        /^https?:\/\/([a-zA-Z0-9-]+\.)?pacosotelo\.com$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(null, true); // Fallback permisivo para despliegues preview
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Accept,Authorization,X-Requested-With,Origin',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  // const config = new DocumentBuilder()
  //   .setTitle('Sleepfy API')
  //   .setDescription('API REST de Sleepfy para evaluación de sueño, rutinas con IA, horarios y comunidad')
  //   .setVersion('1.0')
  //   .addBearerAuth()
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api/docs', app, document, {
  //   customSiteTitle: 'Sleepfy API Documentation',
  // });

  await app.listen(envs.port);
}
bootstrap();

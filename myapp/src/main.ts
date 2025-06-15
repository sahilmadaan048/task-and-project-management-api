// src/main.ts (excerpt)
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RolesGuard } from './auth/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation (using DTOs and class-validator)
  app.useGlobalPipes(new ValidationPipe());

  // Global interceptor to apply class-transformer (e.g. @Exclude) on responses
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalGuards(new RolesGuard(new Reflector()));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Tasks & Projects API')
    .setDescription('API for managing tasks, projects, and comments')
    .setVersion('1.0')
    .addBearerAuth()            
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(5050);
}
bootstrap();

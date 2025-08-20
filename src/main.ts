import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function _initPipes(app: INestApplication<any>) {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
}

function _initFilters(app: INestApplication<any>) {
  app.useGlobalFilters(new HttpExceptionFilter());
}

function _initInterceptors(app: INestApplication<any>) {
  app.useGlobalInterceptors(new LoggingInterceptor());
}

function _generateApiDoc(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Todo App')
    .setDescription('Todo app API description')
    .setVersion('1.0')
    .addTag('todo')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  _initPipes(app);
  _initFilters(app);
  _initInterceptors(app);

  _generateApiDoc(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

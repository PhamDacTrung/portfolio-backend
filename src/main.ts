import { CoreTransformInterceptor } from '@core/interceptors';
import { PORT } from '@environments';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { Logger } from 'winston';
import { AppModule } from './app.module';
import { setupSwagger } from './utilities';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  // Setup Swagger documentation
  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {}),
    new CoreTransformInterceptor(),
  );

  await app.listen(PORT);

  // Get the Winston logger instance
  const logger = app.get(WINSTON_MODULE_PROVIDER) as Logger;
  logger.info(`Server is running on port ${PORT}`);
}
bootstrap();

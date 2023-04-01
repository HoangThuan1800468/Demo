import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main (main.ts)');
  const configService = app.get(ConfigService);
  const PORT = parseInt(configService.get('PORT'));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT,() => {
    logger.log(`Server running on port ${PORT}`)
  });
}
bootstrap();

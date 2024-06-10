import * as dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV || 'development'; // 默认为 'development'
dotenv.config({ path: `.env.${nodeEnv}.local` });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局启用验证管道
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4100);
}
bootstrap();

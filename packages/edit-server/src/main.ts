import * as dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV || 'development'; // 默认为 'development'
dotenv.config({ path: `.env.${nodeEnv}.local` });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

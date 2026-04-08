import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './config/env';
import connectDB from './config/database';

async function bootstrap() {
  // Create NestJS app
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global prefix (like /api/v1)
  app.setGlobalPrefix('api/v1');

  // Connect DB
  await connectDB();

  // Start server
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);

  console.log(`Server running on port ${PORT}`);
}

bootstrap();
import { Module } from '@nestjs/common';
import { ServiceController } from './service/service.controller';

@Module({
  controllers: [ServiceController]
})
export class CategoryModule {}

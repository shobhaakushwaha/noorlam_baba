import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { AdminJwtStrategy } from '../admin-jwt.strategy';

@Module({
   controllers: [OtpController],
  providers: [OtpService,AdminJwtStrategy],
})
export class OtpModule {}
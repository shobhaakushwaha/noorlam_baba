import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';

import {

  ForgotPasswordDto,
  VerifyOtpDto,
  ResetPasswordDto,
} from './otp.tdo';
import { Public } from '../public.decorator';

@Public() 
@Controller('admin/otp') // base route
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  

  // Forgot Password
  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.otpService.forgotPassword(body);
  }

  // Verify OTP
  @Post('verify-otp')
  verifyOtp(@Body() body: VerifyOtpDto) {
    return this.otpService.verifyOtp(body);
  }

  // Reset Password
  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.otpService.resetPassword(body);
  }
}

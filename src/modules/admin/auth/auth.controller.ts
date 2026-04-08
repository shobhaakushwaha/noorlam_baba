import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  VerifyOtpDto,
  ResetPasswordDto,
} from './auth.dto';
import { Public } from './public.decorator';

@Public() 
@Controller('admin/auth') // base route
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register API
  
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  // Login API
 

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  // Forgot Password
  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  // Verify OTP
  @Post('verify-otp')
  verifyOtp(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtp(body);
  }

  // Reset Password
  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }
}

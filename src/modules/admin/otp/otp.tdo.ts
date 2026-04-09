import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
// Forgot Password DTO
export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}

// Verify OTP DTO
export class VerifyOtpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  otp: string;
}

// Reset Password DTO
export class ResetPasswordDto {
  @IsNotEmpty()
  otp: string;

  @MinLength(6)
  newPassword: string;
    confirmPassword: string;

}
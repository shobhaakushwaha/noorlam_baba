import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// Register DTO
export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  mobile: string;

  @MinLength(6)
  password: string;
}

// Login DTO
export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

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
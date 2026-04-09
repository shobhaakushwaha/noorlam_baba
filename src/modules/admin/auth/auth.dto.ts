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


import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsIn,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Valid email is required' })
  email: string;

  @IsNotEmpty({ message: 'Mobile number is required' })
  @Matches(/^[0-9]{10}$/, { message: 'Mobile must be 10 digits' })
  mobile: string;

  @IsNotEmpty({ message: 'Country code is required' })
  countryCode: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  // ✅ Gender
  @IsNotEmpty({ message: 'Gender is required' })
  @IsIn(['male', 'female', 'other'], {
    message: 'Gender must be male, female or other',
  })
  gender: string;

  // ✅ Address
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  // ✅ Latitude
  @IsNotEmpty({ message: 'Latitude is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Latitude must be a number' })
  @Min(-90, { message: 'Latitude must be >= -90' })
  @Max(90, { message: 'Latitude must be <= 90' })
  latitude: number;

  // ✅ Longitude
  @IsNotEmpty({ message: 'Longitude is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Longitude must be a number' })
  @Min(-180, { message: 'Longitude must be >= -180' })
  @Max(180, { message: 'Longitude must be <= 180' })
  longitude: number;

  @IsNotEmpty({ message: 'Device Token is required' })
  deviceToken: string;

  @IsNotEmpty({ message: 'Device Type is required' })
  deviceType: string;


  

   @IsNotEmpty({ message: 'Device Type is required' })
  birthDate: Date;
}
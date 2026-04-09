import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInterestDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  image?: string;
}

export class GetInterestQueryDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  status?: string; // 'true' | 'false'
}

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './auth.dto';
import { Public } from '../public.decorator';
import { ResponseHandler } from '../../../helpers/responseHelper';
import { Response } from 'express';
import { Res } from '@nestjs/common';

@Public()
@Controller('user/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 



  @Post('register')
async register(
  @Body() body: RegisterDto,
  @Res() res: Response,
) {
  const result = await this.authService.register(body);

  return ResponseHandler.send(
    res,
    result.data,
    result.message,
    result.status,
  );
}
}
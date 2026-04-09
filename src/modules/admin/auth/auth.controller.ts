import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import {
  RegisterDto,
  LoginDto,
 
} from './auth.dto';
import { Public } from '../public.decorator';

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

  
}

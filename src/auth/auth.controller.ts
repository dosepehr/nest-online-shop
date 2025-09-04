import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'utils/guards/auth.guard';
import type { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'utils/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Get('/me')
  @UseGuards(AuthGuard)
  getMe(@CurrentUser() user: User) {
    return this.authService.getMe(user);
  }
}

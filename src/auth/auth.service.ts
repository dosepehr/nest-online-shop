import { Injectable, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { generateHash } from 'utils/funcs/password';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    return this.usersService.register({
      ...registerDto,
      password: await generateHash(registerDto.password),
    });
  }
  async login(loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }
}

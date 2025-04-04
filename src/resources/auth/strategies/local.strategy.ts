import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      // Configure passport-local to use these field names
      usernameField: 'phone',
      passwordField: 'password',
    });
  }

  async validate(phone: string, password: string) {

    const user = await this.authService.validateUser(phone, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

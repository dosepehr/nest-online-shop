import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/funcs/password';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(phone: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByPhone(phone);
        if (user) {
            const isPasswordValid = await comparePassword(pass, user.password);
            if (isPasswordValid) {
                const { password, ...result } = user;
                return result;
            }
        }
        return null;
    }

    async signToken(user: User) {
        const payload = {
            id: user.id,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.usersService.findOneByPhone(registerDto.phone);
        if (existingUser) {
            throw new BadRequestException('User already exists with this phone number');
        }
        const user = await this.usersService.create(registerDto);
        return this.signToken(user);
    }
}

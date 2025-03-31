import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/funcs/password';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(name: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(name);
        if (user) {
            const isPasswordValid = await comparePassword(pass, user.password);
            if (isPasswordValid) {
                const { password, ...result } = user;
                return result;
            }
        }
        return null;
    }
}

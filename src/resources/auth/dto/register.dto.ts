import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('IR')
    phone: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

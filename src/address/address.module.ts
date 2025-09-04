import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AdminAddressController } from './controllers/admin-address.controller';
import { AddressController } from './controllers/address.controller';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address]),
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AddressController, AdminAddressController],
  providers: [AddressService],
})
export class AddressModule {}

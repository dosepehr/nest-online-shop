import { Module } from '@nestjs/common';

import { AdminAddressController } from './controllers/admin-address.controller';
import { AddressController } from './controllers/address.controller';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [AddressController, AdminAddressController],
  providers: [AddressService],
})
export class AddressModule {}

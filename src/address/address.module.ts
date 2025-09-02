import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}

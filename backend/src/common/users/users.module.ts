import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CryptoModule } from '../crypto/crypto.module';
import { User, UserSchema } from './schemas/users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    CryptoModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}

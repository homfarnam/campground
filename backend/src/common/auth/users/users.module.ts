import { Module } from '@nestjs/common';
import { MongoModule } from '../../mongo';
import { CryptoModule } from '../crypto/crypto.module';
import { UsersService } from './users.service';

@Module({
  imports: [CryptoModule, MongoModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

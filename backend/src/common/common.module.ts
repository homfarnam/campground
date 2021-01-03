import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CryptoModule } from './crypto/crypto.module';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [UsersModule, CryptoModule, MongoModule],
})
export class CommonModule {}

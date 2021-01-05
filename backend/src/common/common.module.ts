import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongoModule, AuthModule],
})
export class CommonModule {}

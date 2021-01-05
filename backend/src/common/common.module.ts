import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { AuthModule } from './auth';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [MongoModule, AuthModule, UtilsModule],
  exports: [MongoModule, UtilsModule],
})
export class CommonModule {}

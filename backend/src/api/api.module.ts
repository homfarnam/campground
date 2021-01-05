import { Module } from '@nestjs/common';
import { CampsModule } from './camps/camps.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, CampsModule],
})
export class ApiModule {}

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from '../../common/auth';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
})
export class UsersModule {}

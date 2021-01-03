import { Module } from '@nestjs/common';
import { CryptoModule } from 'src/common/crypto';
import { UsersModule } from 'src/common/users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, CryptoModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

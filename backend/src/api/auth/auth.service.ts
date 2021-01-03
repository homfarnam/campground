import { Injectable } from '@nestjs/common';
import { CryptoService } from 'src/common/crypto';
import { LoginDto, RegisterDto, UsersService } from '../../common/users';
import { UserData } from './interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private cryptoService: CryptoService,
  ) {}

  registerUser(registerDto: RegisterDto): Promise<UserData> {
    return Promise.resolve(new UserData());
  }

  loginUser(loginDto: LoginDto): Promise<UserData> {
    return Promise.resolve(new UserData());
  }

  logoutUser(userId: string): Promise<void> {
    return Promise.resolve();
  }

  refreshUser(token: string): Promise<string> {
    return Promise.resolve('');
  }
}

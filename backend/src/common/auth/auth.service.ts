import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from './crypto';
import { LoginDto, RegisterDto, UserData } from './users';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async registerUser(registerDto: RegisterDto) {
    return this.userService
      .createUser(registerDto)
      .then((user) => this.signUser(user))
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });
  }

  async loginUser(loginDto: LoginDto) {
    return this.userService.findUser(loginDto).then(async (user) => {
      if (user) {
        const token = this.cryptoService.generateRefreshToken();
        await this.userService.updateUser(user.id, { token });
        user.token = token;
        return this.signUser(user);
      } else throw new UnauthorizedException();
    });
  }

  async logoutUser(userId: string) {
    const user = await this.userService.findUser({ userId });
    if (user) {
      await this.userService.updateUser(userId, { token: null });
      return;
    } else {
      throw new UnauthorizedException();
    }
  }

  async refreshUser(token: string): Promise<string> {
    const user = await this.userService.findUser({ token });
    if (user) {
      const { token, id, ...userData } = user;
      const payload = { sub: id, ...userData };
      const accessToken = this.jwtService.sign(payload);
      return accessToken;
    } else throw new UnauthorizedException();
  }

  private signUser(user: UserData) {
    const { id, token, ...userData } = user;
    const accessToken = this.jwtService.sign({ sub: id, ...userData });
    return { ...userData, accessToken, refreshToken: token };
  }
}

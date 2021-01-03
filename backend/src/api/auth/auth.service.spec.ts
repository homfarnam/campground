import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../../common/users';
import { CryptoService } from '../../common/crypto';

describe('UsersService', () => {
  let authService: AuthService;
  let cryptoService: CryptoService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, CryptoService, AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    cryptoService = module.get<CryptoService>(CryptoService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('providers should be defined', () => {
    expect(usersService).toBeDefined();
    expect(cryptoService).toBeDefined();
    expect(authService).toBeDefined();
  });
});

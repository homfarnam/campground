import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../../config';
import { CryptoService } from './crypto.service';

jest.mock('bcrypt', () => {
  return {
    hashSync: jest.fn(),
    compareSync: jest.fn(() => true),
  };
});
jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(),
    verify: jest.fn(),
  };
});

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
      ],
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('hash(keyword:string)', () => {
    bcrypt.hashSync = jest.fn().mockReturnValue('');
    const keyword = 'keyword';
    const pwd = service.hash(keyword);
    expect(typeof pwd).toBe('string');
    expect(bcrypt.hashSync).toBeCalledWith(keyword, 10);
  });

  it('compare(original, hashed)', () => {
    const keyword = 'keyword';
    const hashedkeyword = service.hash(keyword);
    const result = service.compare(keyword, hashedkeyword);
    expect(typeof result).toBe('boolean');
    expect(bcrypt.compareSync).toBeCalledWith(keyword, hashedkeyword);
  });

  it('sign(sub)', () => {
    const sub = 'sub';
    jwt.sign = jest.fn().mockReturnValue('');
    const signed = service.sign(sub);
    expect(typeof signed).toBe('string');
    expect(jwt.sign).toBeCalled();
  });

  describe('verify(token)', () => {
    it('verify(unexpiredToken)', () => {
      const token = '';
      jwt.verify = jest.fn().mockReturnValue({ exp: Date.now() / 1000 - 100 });
      const res = service.verify(token);
      expect(jwt.verify).toBeCalled();
      expect(res).toBeFalsy();
    });

    it('verify(expiredToken)', () => {
      const token = 'token';
      jwt.verify = jest.fn().mockReturnValue({
        exp: Date.now() / 1000 + 1000,
      });
      const res = service.verify(token);
      expect(jwt.verify).toBeCalled();
      expect(res).toBeTruthy();
    });
  });
});

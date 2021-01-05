import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  generateRefreshToken() {
    const sub = uuid();
    return this.jwtService.sign({ sub });
  }

  verifyRefreshToken(token: string): boolean {
    try {
      const { exp } = this.jwtService.verify(token);
      console.log(exp);
      if (exp < Date.now() / 1000) return true;
      else return false;
    } catch (e) {
      return false;
    }
  }

  hash(str: string) {
    return bcrypt.hashSync(str, 10);
  }

  compare(original: string, hashed: string): boolean {
    return bcrypt.compare(original, hashed);
  }
}

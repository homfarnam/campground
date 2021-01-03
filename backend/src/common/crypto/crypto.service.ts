import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CryptoService {
  constructor(private config: ConfigService) {}

  hash(keyword: string): string {
    return bcrypt.hashSync(keyword, 10);
  }

  compare(original: string, hashed: string): boolean {
    return bcrypt.compareSync(original, hashed);
  }

  sign(sub: string): string {
    const { expiration, secret } = this.config.get('auth.REFRESH_TOKEN');
    return jwt.sign({ sub }, secret, { expiresIn: expiration });
  }

  verify(token: string): boolean {
    const { secret } = this.config.get('auth.REFRESH_TOKEN');
    try {
      const { exp } = jwt.verify(token, secret) as any
      if (exp < Date.now() / 1000) return false;
      return true;
    } catch (e) {
      return false;
    }
  }
}

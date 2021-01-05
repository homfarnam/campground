import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  noPassByEmail(email: string): string {
    let new_email = email;
    if (String(email).indexOf('@') > 0) {
      let str = email.split('@');
      let _s = '';
      if (str[0].length > 3) {
        for (let i = 3; i < str[0].length; i++) {
          _s += '*';
        }
        new_email = str[0].substr(0, 3) + _s + '@' + str[1];
      } else {
        for (let i = 1; i < str[0].length; i++) {
          _s += '*';
        }
        new_email = str[0].substr(0, 1) + _s + '@' + str[1];
      }
    }
    return new_email;
  }
}

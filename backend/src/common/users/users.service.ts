import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './schemas/users.schema';
import { DbUser } from './interface';
import { RegisterDto, UserFilterDto } from './dto';
import { CryptoService } from '../crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private cryptoService: CryptoService,
  ) {}

  async createUser(registerDto: RegisterDto): Promise<DbUser> {
    const { email, password } = registerDto;
    const hashedPwd = this.cryptoService.hash(password);
    const token = this.cryptoService.sign(email);
    const user = await this.userModel.create({
      email,
      password: hashedPwd,
      token,
    });
    try {
      return this.cleanUser(user);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findUser(filter: UserFilterDto): Promise<DbUser | null> {
    const { password, ...restFilter } = filter;
    const user = await this.userModel
      .findOne(restFilter)
      .then((doc) => (doc ? doc.toJSON() : null));

    if (!user) return null;
    const { token } = restFilter;
    if (token && this.cryptoService.verify(token)) {
      return this.cleanUser(user);
    }
    if (this.cryptoService.compare(password, user.password)) {
      return this.cleanUser(user);
    }
    return null;
  }

  updateUser(userId: string, update: any) {
    return this.userModel.updateOne({ _id: userId }, update);
  }

  private cleanUser(user: any) {
    const { _id, password, ...userData } = user;
    return { id: _id, ...userData };
  }
}

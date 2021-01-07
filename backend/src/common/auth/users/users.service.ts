import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../mongo/schemas';
import { RegisterDto } from './dto';
import { DbUser, UserData } from './interfaces';
import { CryptoService } from '../crypto';

// A service used to create/find/update a user document in MongoDb
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly cryptoService: CryptoService,
  ) {}

  async createUser(registerDto: RegisterDto): Promise<UserData> {
    const { email, password, nickname = null } = registerDto;

    const hashedPwd = this.cryptoService.hash(password);
    const userData: any = {
      email,
      password: hashedPwd,
      token: this.cryptoService.generateRefreshToken(),
    };
    if (nickname) userData.nickname = nickname;

    return new Promise((resolve, reject) => {
      this.userModel.create(userData, (err: unknown, user: UserDocument) => {
        if (err) reject(err);
        else resolve(this.cleanUser(user.toJSON() as DbUser));
      });
    });
  }

  async findUser(filter: any): Promise<UserData | null> {
    const { email, password, token, userId } = filter;
    let user: any = null;
    // login with email and password
    if (email) {
      user = await this.userModel
        .findOne({ email })
        .then((doc) => (doc ? doc.toJSON() : null));
      if (user && this.cryptoService.compare(password, user.password)) {
        return this.cleanUser(user);
      } else return null;
    }
    // login with refresh token
    if (token) {
      return this.userModel
        .findOne({ token })
        .then((doc) => (doc ? doc.toJSON() : null))
        .then((user) => this.cleanUser(user as DbUser));
    }
    if (userId) {
      return this.userModel
        .findById(userId)
        .then((doc) => (doc ? (doc.toJSON() as DbUser) : null))
        .then((user) => this.cleanUser(user));
    }
    return this.cleanUser(user);
  }

  updateUser(userId: string, update: object) {
    return this.userModel.updateOne({ _id: userId }, update);
  }

  private cleanUser(user: DbUser): UserData | null {
    if (!user) return null;
    const { _id, ...userData } = user;
    delete userData.password;
    return { id: _id, ...userData };
  }
}

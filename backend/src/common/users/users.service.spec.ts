import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CryptoService } from '../crypto';
import { User, UserDocument } from './schemas/users.schema';
import { UsersService } from './users.service';

const mockUser: (user) => any = (userData) => {
  return {
    _id: Date.now().toString(),
    ...userData,
    token: 'token',
  };
};

const mockDoc: (user: any) => UserDocument = (user) => ({
  ...user,
  _id: Date.now().toString(),
  token: Date.now().toString(),
  toJSON() {
    return {
      _id: this._id,
      token: this.token,
      ...user,
    };
  },
});

describe('UsersService', () => {
  let userService: UsersService;
  let userModel: Model<UserDocument>;
  let cryptoService: CryptoService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: CryptoService,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    cryptoService = module.get<CryptoService>(CryptoService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser(registerDto)', () => {
    it('create none exsiting user', async () => {
      const registerDto = {
        email: 'testuser@gmail.com',
        password: 'hello',
      };
      jest
        .spyOn(userModel, 'create')
        .mockImplementation((any) => mockDoc(registerDto));
      const user = await userService.createUser(registerDto);
      expect(cryptoService.hash).toBeCalledWith(registerDto.password);
      expect(cryptoService.sign).toBeCalledWith(registerDto.email);
      expect(user.id).toBeDefined();
    });

    it('create an existing user', async () => {
      const registerDto = {
        email: 'testuser@gmail.com',
        password: 'helo',
      };
      jest.spyOn(userModel, 'create').mockImplementation(() => new Error());
      try {
        const user = await userService.createUser(registerDto);
      } catch (e) {
        expect(e).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('findUser', () => {
    it('find existing user with credential', async () => {
      const crendentials = {
        email: 'testuser@nest.com',
        password: 'test',
      };
      jest
        .spyOn(userModel, 'create')
        .mockImplementation((credential) => mockUser(credential));
      const user = await userModel.create(crendentials);
      jest.spyOn(cryptoService, 'compare').mockReturnValueOnce(true);
      jest.spyOn(userModel, 'findOne').mockResolvedValue(mockDoc(user));

      const userInDb = await userService.findUser(crendentials);
      expect(cryptoService.compare).toBeCalled();
      expect(userModel.findOne).toBeCalled();
      expect(userInDb).not.toBeNull();
    });

    it('find none-existing user with creidential', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);
      const userInDb = await userService.findUser({
        email: 'hello@gmail.coom',
        password: 'hello',
      });
      expect(userInDb).toBeNull();
      expect(cryptoService.compare).not.toBeCalled();
    });
  });

  it('updateUser', async () => {
    const registerDto = {
      email: 'hello@gmail.com',
      password: 'password',
    };
    jest
      .spyOn(userModel, 'create')
      .mockImplementation((regiserDto) => mockUser(registerDto));
    const user = await userService.createUser(registerDto);
    const update = { token: null };

    await userService.updateUser(user.id, update);
    expect(userModel.updateOne).toBeCalled();
  });
});

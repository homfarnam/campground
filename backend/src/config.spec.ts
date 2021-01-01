import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import config from './config';

describe('Global configuration', () => {
  let app: INestApplication;
  let conf: ConfigService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    conf = app.get<ConfigService>(ConfigService);
  });

  afterAll(async (e) => {
    await app.close();
  });

  it('config should have app configuration', () => {
    const app = conf.get('app');
    const expected = {
      port: expect.any(Number),
      secret: expect.any(String),
    };
    expect(app).toEqual(expected);
  });

  it('config should have mongodb  configuration', () => {
    const mongo = conf.get('mongo');
    const expected = {
      uri: expect.stringContaining('mongodb://'),
      db: expect.any(String),
    };
    expect(mongo).toEqual(expected);
  });
  it('config should have access token and refresh token configuration', () => {
    const auth = conf.get('auth');
    const authRecord = {
      secret: expect.any(String),
      expiration: expect.any(String),
    };
    const { ACCESS_TOKEN, REFRESH_TOKEN } = auth;
    expect(ACCESS_TOKEN).toEqual(authRecord);
    expect(REFRESH_TOKEN).toEqual(authRecord);
  });
});

import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (conf: ConfigService) => {
        const { uri, db } = conf.get('mongo');
        return {
          uri: `${uri}/${db}`,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
        };
      },
    }),
    ApiModule,
    CommonModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Camp,
  CampSchema,
  Review,
  ReviewSchema,
  User,
  UserSchema,
} from './schemas';

@Module({
  imports: [
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
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: Camp.name, schema: CampSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: Camp.name, schema: CampSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class MongoModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Camp, CampSchema, Review, ReviewSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: Camp.name, schema: CampSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: Camp.name, schema: CampSchema },
    ]),
  ],
})
export class MongoModule {}

import { Module } from '@nestjs/common';
import { UtilsModule } from '../../common/utils';
import { MongoModule } from '../../common/mongo';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [MongoModule, UtilsModule],
  providers: [ReviewsService],
})
export class ReviewsModule {}

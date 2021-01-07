import { Module } from '@nestjs/common';
import { UtilsModule } from '../../common/utils';
import { MongoModule } from '../../common/mongo';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';

@Module({
  imports: [MongoModule, UtilsModule],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}

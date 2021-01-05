import { Module } from '@nestjs/common';
import { CampsModule } from './camps/camps.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, CampsModule, ReviewsModule],
})
export class ApiModule {}

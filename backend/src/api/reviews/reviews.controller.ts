import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/auth';
import { User } from '../../common/auth/users';
import { CreateReviewDto } from './dto';
import { ReviewsService } from './reviews.service';

@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createCampsReview(
    @User('userId') author: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.createCampsReview(author, createReviewDto);
  }

  @Get()
  getCampsReviews(@Query('campId') campId: string) {
    return this.reviewsService.getCampsReviews(campId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':reviewId')
  updateReview(
    @User('userId') author: string,
    @Param('reviewId') reviewId: string,
  ) {
    return this.reviewsService.updateReview(author, reviewId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':reviewId')
  deleteReview(
    @User('userId') author: string,
    @Param('reviewId') reviewId: string,
  ) {
    return this.reviewsService.deleteReview(author, reviewId);
  }
}

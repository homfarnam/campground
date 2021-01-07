import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Camp,
  CampDocument,
  Review,
  ReviewDocument,
  User,
} from '../../common/mongo';
import { UtilsService } from '../../common/utils';
import { CreateReviewDto, UpdateReviewDto } from './dto';
import { CampReview } from './interfaces';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(Camp.name) private campModel: Model<CampDocument>,
    private utilService: UtilsService,
  ) {}

  async createCampsReview(
    author: string,
    createReviewDto: CreateReviewDto,
  ): Promise<CampReview> {
    const campId = createReviewDto.camp;
    const campItem = await this.campModel
      .findById(campId)
      .then((doc) => (doc ? doc.toJSON() : null));

    if (!campItem) {
      throw new BadRequestException(`Camp:#${campId} doesn't exist.`);
    }

    return new Promise((resolve, reject) => {
      this.reviewModel.create(
        { ...createReviewDto, author },
        (err: unknown, doc: ReviewDocument) => {
          if (err) reject(err);
          else {
            doc.populate(
              this.getAuthorPopulateData(),
              (err: unknown, review: ReviewDocument) => {
                if (err) reject(err);
                else resolve(this.cleanReview(review.toJSON()));
              },
            );
          }
        },
      );
    });
  }

  getCampsReviews(campId: string): Promise<CampReview[]> {
    return this.reviewModel
      .find({ camp: campId })
      .populate(this.getAuthorPopulateData())
      .then((docs) => docs.map((doc) => this.cleanReview(doc.toJSON())));
  }

  async updateReview(
    author: string,
    reviewId: string,
    update: UpdateReviewDto,
  ): Promise<CampReview> {
    const review = await this.reviewModel
      .findOneAndUpdate({ author, _id: reviewId }, update, { new: true })
      .populate(this.getAuthorPopulateData())
      .then((doc) => (doc ? doc.toJSON() : null));
    if (review) return this.cleanReview(review);
    else throw new BadRequestException(this.getBadRequestMsg(reviewId));
  }

  deleteReview(author: string, reviewId: string) {
    return this.reviewModel
      .findOneAndDelete({ author, _id: reviewId })
      .then((doc) => {
        if (doc) return 'ok';
        else throw new BadRequestException(this.getBadRequestMsg(reviewId));
      });
  }

  private cleanReview(review: any): CampReview {
    if (!review) return null;

    const { _id, author, ...reviewData } = review;
    author.id = author._id;
    delete author._id;
    author.email = this.utilService.noPassByEmail(author.email);
    return { id: _id, author, ...reviewData };
  }

  private getBadRequestMsg(review: string) {
    return `Either current user is not the review owner or review#:${review} is not exist`;
  }

  private getAuthorPopulateData() {
    return {
      path: 'author',
      model: User.name,
      select: 'id email nickname',
    };
  }
}

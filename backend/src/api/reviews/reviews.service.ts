import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Camp, CampDocument, Review, ReviewDocument } from '../../common/mongo';
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
              {
                path: 'author',
                model: 'user',
                select: { id: 1, email: 1, nickname: 1 },
                populate: { path: 'author', model: 'users' },
              },
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
      .populate('author', { id: 1, nickname: 1, email: 1 })
      .then((docs) => docs.map((doc) => this.cleanReview(doc.toJSON())));
  }

  async updateReview(
    author: string,
    reviewId: string,
    update: UpdateReviewDto,
  ): Promise<CampReview> {
    const review = await this.reviewModel
      .updateOne({ author, _id: reviewId }, update, { new: true })
      .populate('auhtor', { id: 1, email: 1, nickname: 1 })
      .then((doc) => (doc ? doc.toJSON() : null));
    if (review) return this.cleanReview(review);
    else throw new UnauthorizedException();
  }

  deleteReview(author: string, reviewId: string) {
    return this.reviewModel.findOneAndDelete({ author, _id: reviewId });
  }

  private cleanReview(review: any): CampReview {
    if (!review) return null;
    const { _id, author = {}, ...rest } = review;
    const noPassByEmail = this.utilService.noPassByEmail(author.email);
    return {
      ...rest,
      id: _id,
      author: {
        ...author,
        email: noPassByEmail,
      },
    };
  }
}

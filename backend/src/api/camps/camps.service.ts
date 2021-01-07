import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/auth/users';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Camp, CampDocument } from '../../common/mongo';
import { UtilsService } from '../../common/utils';
import { CreateCampDto } from './dto/create-camp.dto';
import { UpdateCampDto } from './dto/update-camp.dto';
import { CampBase, CampData } from './interfaces';

@Injectable()
export class CampsService {
  constructor(
    @InjectModel(Camp.name) private readonly campModel: Model<CampDocument>,
    private readonly utilService: UtilsService,
  ) {}

  async findAllCamps(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    return this.campModel.find().skip(offset).limit(limit).exec();
  }

  async findOneCamp(id: string) {
    const camp = await this.campModel.findOne({ _id: id }).exec();
    if (!camp) {
      throw new NotFoundException(`Camp #${id} not found`);
    }
    return camp;
  }

  async createCamp(
    author: string,
    createCampDto: CreateCampDto,
  ): Promise<CampBase> {
    const campId = createCampDto.title;
    const campItem = await this.campModel
      .findById(campId)
      .then((doc) => (doc ? doc.toJSON() : null));

    if (!campItem) {
      throw new BadRequestException(`Camp:#${campId} doesn't exist.`);
    }

    return new Promise((resolve, reject) => {
      this.campModel.create(
        { ...CreateCampDto, author },
        (err: unknown, doc: CampDocument) => {
          if (err) reject(err);
          else {
            doc.populate(
              this.getAuthorPopulateData(),
              (err: unknown, camp: CampDocument) => {
                if (err) reject(err);
                else resolve(this.cleanCamp(camp.toJSON()));
              },
            );
          }
        },
      );
    });
  }

  async updateCamp(
    id: string,
    author: string,
    updateCampDto: UpdateCampDto,
  ): Promise<CampBase> {
    const existingCamp = await this.campModel
      .findOneAndUpdate(
        { author, _id: id },
        { $set: updateCampDto },
        { new: true },
      )
      .exec();
    if (existingCamp) return this.cleanCamp(existingCamp);
    else throw new BadRequestException(this.getBadRequestMsg(id));
  }

  async removeCamp(id: string) {
    const camp = await this.findOneCamp(id);
    return camp.remove();
  }

  private getBadRequestMsg(camp: string) {
    return `Either current user is not the review owner or review#:${camp} is not exist`;
  }

  private getAuthorPopulateData() {
    return {
      path: 'author',
      model: User.name,
      select: 'id email nickname',
    };
  }

  // Frontend expects backend returns data with id instead of _id
  private cleanCamp(camp: any): CampData | null {
    if (!camp) return null;

    const { _id, author = {}, ...rest } = camp;
    const email = this.utilService.noPassByEmail(author.email);
    return { id: _id, ...rest, author: { ...author, email } };
  }
}

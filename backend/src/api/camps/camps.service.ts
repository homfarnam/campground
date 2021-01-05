import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Camp, CampDocument } from '../../common/mongo';
import { UtilsService } from '../../common/utils';
import { CreateCampDto } from './dto/create-camp.dto';
import { UpdateCampDto } from './dto/update-camp.dto';
import { CampData } from './interfaces';

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

  createCamp(createCampDto: CreateCampDto) {
    const camp = new this.campModel(createCampDto);
    return camp.save();
  }

  async updateCamp(id: string, updateCampDto: UpdateCampDto) {
    const existingCamp = await this.campModel
      .findOneAndUpdate({ _id: id }, { $set: updateCampDto }, { new: true })
      .exec();
    if (!existingCamp) {
      // update the existing entity
      throw new NotFoundException(`Camp #${id} not found!`);
    }
    return existingCamp;
  }

  async removeCamp(id: string) {
    const camp = await this.findOneCamp(id);
    return camp.remove();
  }

  // Frontend expects backend returns data with id instead of _id
  private cleanCamp(camp: any): CampData | null {
    if (!camp) return null;

    const { _id, author = {}, ...rest } = camp;
    const email = this.utilService.noPassByEmail(author.email);
    return { id: _id, ...rest, author: { ...author, email } };
  }
}

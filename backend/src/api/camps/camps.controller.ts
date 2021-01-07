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
import { JwtAuthGuard } from 'src/common/auth';
import { User } from 'src/common/auth/users';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CampsService } from './camps.service';
import { CreateCampDto } from './dto/create-camp.dto';
import { UpdateCampDto } from './dto/update-camp.dto';

@Controller('camps')
export class CampsController {
  constructor(private readonly campService: CampsService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.campService.findAllCamps(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campService.findOneCamp(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User('userId') author: string, @Body() createCampDto: CreateCampDto) {
    return this.campService.createCamp(author, createCampDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @User('userId') author: string,
    @Param('id') id: string,
    @Body() updateCampDto: UpdateCampDto,
  ) {
    return this.campService.updateCamp(author, id, updateCampDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campService.removeCamp(id);
  }
}

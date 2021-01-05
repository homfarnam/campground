import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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

  @Post()
  create(@Body() createCampDto: CreateCampDto) {
    console.log(createCampDto instanceof CreateCampDto);
    return this.campService.createCamp(createCampDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampDto: UpdateCampDto) {
    return this.campService.updateCamp(id, updateCampDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campService.removeCamp(id);
  }
}

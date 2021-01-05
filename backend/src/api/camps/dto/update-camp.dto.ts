import { PartialType } from '@nestjs/mapped-types';
import { CreateCampDto } from './create-camp.dto';

export class UpdateCampDto extends PartialType(CreateCampDto) {}

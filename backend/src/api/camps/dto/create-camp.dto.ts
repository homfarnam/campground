import { IsNumber, IsString } from 'class-validator';
export class CreateCampDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  desc: string;

  @IsString()
  imgUrl: string;

  @IsString()
  location: string;
}

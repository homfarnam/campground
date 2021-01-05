import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @Length(24)
  @IsString()
  camp: string;

  @IsString()
  title: string;

  @Max(5)
  @Min(0)
  @IsNumber()
  star: number = 5;

  @IsString()
  content: string;
}

import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class RegisterDto {
  @MinLength(6)
  @IsEmail()
  email: string;

  @Length(8, 45)
  @IsString()
  password: string;
}

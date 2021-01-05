import { IsEmail, Length } from 'class-validator';

export class LoginDto {
  @Length(8, 45)
  @IsEmail()
  email: string;

  @Length(8, 45)
  password: string;
}

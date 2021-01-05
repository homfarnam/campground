import { IsOptional, IsString } from 'class-validator';
import { LoginDto } from './login-user.dto';

export class RegisterDto extends LoginDto {
  @IsOptional()
  @IsString()
  nickname: string;
}

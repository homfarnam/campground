import { LoginDto } from './login-user.dto';

export type UserFilterDto = Partial<LoginDto> & { token?: string };

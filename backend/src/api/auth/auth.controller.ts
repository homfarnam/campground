import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { User } from '../../common';
import { LoginDto, RegisterDto } from '../../common/users';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registerUser(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  @Post('login')
  loginUser(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
  }

  @Get('logout')
  logoutUser(@User('id') userId: string) {
    return this.authService.logoutUser(userId);
  }

  @Get('refresh')
  refreshuser(@Headers('refresh-token') token: string) {
    return this.authService.refreshUser(token);
  }
}

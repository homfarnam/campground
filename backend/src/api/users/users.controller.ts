import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { AuthService, JwtAuthGuard, LocalAuthGuard } from '../../common/auth';
import { RegisterDto, User } from '../../common/auth/users';

@Controller('api/users')
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registerUser(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(@Req() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logoutUser(@User('userId') userId: string) {
    return this.authService.logoutUser(userId);
  }

  @Get('refresh')
  refreshUser(@Headers('refresh-token') token: string) {
    return this.authService.refreshUser(token);
  }
}

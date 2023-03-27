import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthTokenRes } from '@rahkarsanat/kiz-sdk';
import { AuthTokenDto } from './dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('token')
  async token(@Body() data: AuthTokenDto): Promise<AuthTokenRes> {
    return this.authService.token(data);
  }

  @Get('logout')
  async logout(): Promise<boolean> {
    return this.authService.logout();
  }
}

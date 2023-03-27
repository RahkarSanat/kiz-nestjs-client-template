import { Injectable } from '@nestjs/common';
import { AuthTokenRes } from '@rahkarsanat/kiz-sdk';
import { AuthTokenDto } from './dto';
import { KizProvider } from '@common';

@Injectable()
export class AuthService {
  constructor(private readonly kizProvider: KizProvider) {}

  async token(data: AuthTokenDto): Promise<AuthTokenRes> {
    return this.kizProvider.client.authService.token(data);
  }

  async logout(): Promise<boolean> {
    return this.kizProvider.client.authService.logout();
  }

  async decrypt(): Promise<AuthTokenRes> {
    return this.kizProvider.client.authService.decrypt();
  }
}

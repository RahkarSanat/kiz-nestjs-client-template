import { Injectable } from '@nestjs/common';
import { AuthTokenRes } from '@rahkarsanat/kiz-sdk';
import { AuthTokenDto } from './dto';
import { kiz } from '@common';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class AuthService {
  private config: AxiosRequestConfig;
  constructor() {
    /**
     * For setting new axios config in
     * this class use the defined
     * `config` property above
     */
  }
  async token(data: AuthTokenDto): Promise<AuthTokenRes> {
    return kiz.authService.token(data);
  }

  async logout(): Promise<AuthTokenRes> {
    return kiz.authService.logout();
  }

  async decrypt(): Promise<AuthTokenRes> {
    return kiz.authService.decrypt();
  }
}

import { KIZ_CONFIG } from '@common/configs';
import { TokenDto } from '@common/dto';
import { Event } from '@common/enum';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { KizClient } from '@rahkarsanat/kiz-sdk';
import { CreateAxiosDefaults } from 'axios';

@Injectable()
export class KizProvider {
  private readonly logger = new Logger(KizProvider.name);

  options: CreateAxiosDefaults = KIZ_CONFIG();
  #server: KizClient;
  readonly #client: KizClient;

  get client() {
    return this.#client ?? new KizClient({ ...this.options });
  }

  get server() {
    return this.#server ?? new KizClient({ ...this.options });
  }

  @OnEvent(Event.APP_REFRESH_TOKEN)
  private handleChangeTokenEvent(payload: TokenDto) {
    const { access_token } = payload;
    this.options.headers.common.Authorization = access_token;
    this.#server = new KizClient(this.options);
    this.logger.debug('Token refreshed successfully.');
  }
}

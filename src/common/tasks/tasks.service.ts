import { APP_AUTH } from '@common/configs';
import { Task, Event } from '@common/enum';
import { KizProvider } from '@common/providers';
import { TokenDto } from '@common/dto';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { AuthTokenRes } from '@rahkarsanat/kiz-sdk';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly eventEmitter: EventEmitter2,
    private readonly kizProvider: KizProvider,
  ) {}

  @Timeout(5_000)
  public async startFetchingToken() {
    this.logger.debug('Fetching JWT token for the first time.');

    const response = await this.fetchToken();
    const token = response?.access_token;

    if (!token) throw new UnauthorizedException('The token is not valid');
    this.eventEmitter.emit(Event.APP_REFRESH_TOKEN, new TokenDto(token));

    const interval = setInterval(
      this.callback,
      response.expires_in * 1000 - 10_000,
    );
    this.schedulerRegistry.addInterval(Task.REFRESH_TOKEN, interval);
  }

  private fetchToken = async (): Promise<AuthTokenRes> =>
    this.kizProvider.server.authService.token(APP_AUTH());

  private callback = async () => {
    const response = await this.fetchToken();
    const token = response?.access_token;
    if (!token) throw new UnauthorizedException('The token is not valid');
    this.eventEmitter.emit(Event.APP_REFRESH_TOKEN, new TokenDto(token));
  };
}

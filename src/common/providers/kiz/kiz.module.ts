import { Module, Global } from '@nestjs/common';
import { KizProvider } from './kiz.provider';

@Global()
@Module({
  providers: [KizProvider],
  exports: [KizProvider],
})
export class KizModule {}

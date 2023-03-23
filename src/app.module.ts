import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MONGO_CONFIG } from '@common';
import { AuthModule } from '@apis';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MONGO_CONFIG()),
    AuthModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MONGO_CONFIG, TasksModule, KizModule } from '@common';
import { AuthModule } from '@apis';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MONGO_CONFIG()),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    TasksModule,
    KizModule,
    AuthModule,
  ],
})
export class AppModule {}

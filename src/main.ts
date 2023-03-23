import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { APP_BINDINGS, bootstrapSwagger } from '@common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      validateCustomDecorators: true,
      transform: true,
    }),
  );

  bootstrapSwagger(app);
  const bindings = APP_BINDINGS();
  await app.listen(bindings.port, bindings.host);
  console.log(`Kiz client successfully started on port ${bindings.port}.`);
  console.log(`Swagger UI successfully started on ${bindings.url}/api.`);
}
bootstrap();

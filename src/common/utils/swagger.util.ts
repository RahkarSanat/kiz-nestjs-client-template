import { type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const bootstrapSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(process.env.npm_package_name)
    .setVersion(process.env.npm_package_version)
    .setDescription(process.env.npm_package_description)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { docExpansion: 'none' },
  });
};

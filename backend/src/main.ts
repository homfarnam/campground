import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const conf = app.get<ConfigService>(ConfigService);
  const port = conf.get('app.port');

  await app.listen(port, () => {
    console.log(`\n
      App start at port:${port}
    \n`);
  });
}
bootstrap();

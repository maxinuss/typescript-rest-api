import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { RestModule } from "./rest.module";

async function bootstrap() {
  const app = await NestFactory.create(RestModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(`${process.env.PORT}`);
}

bootstrap().then(() => console.log('Server started'));

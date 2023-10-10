import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Auth } from './middleware/auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(Auth);
  await app.listen(3000);
}
bootstrap();

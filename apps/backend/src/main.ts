import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvironmentVariables>);
  const port = configService.get('PORT', { infer: true });
  const env = configService.get('NODE_ENV', { infer: true });

  app.enableCors();

  await app.listen(port, () => {
    console.log(`Server is running on ${port} in ${env} mode`);
  });
}
bootstrap();

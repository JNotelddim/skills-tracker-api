import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DatabaseService } from './database/database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const databaseService = app.get(DatabaseService);
  await databaseService.enableShutdownHooks(app);
  await app.listen(8080);
}
bootstrap();

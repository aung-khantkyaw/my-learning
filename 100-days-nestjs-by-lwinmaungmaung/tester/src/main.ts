import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { LoggerMiddleware } from './logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(LoggerMiddleware); // Global Middleware
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err: any) => {
  console.error('Error during application bootstrap:', err);
});

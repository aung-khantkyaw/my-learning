import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsResourceModule } from './cats-resource/cats-resource.module';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { CatsController } from './cats/cats.controller';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CatchEverythingFilter } from './CatchEverything.filter';
import { ValidationPipe } from './Validation/validation.pipe';

@Module({
  imports: [CatsResourceModule, CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('cats');
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'cats/{*cat_id}', method: RequestMethod.GET });
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.POST })
      .forRoutes(CatsController);
  }
}

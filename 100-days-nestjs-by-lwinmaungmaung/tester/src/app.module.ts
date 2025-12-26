import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsResourceModule } from './cats-resource/cats-resource.module';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CatsResourceModule],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}

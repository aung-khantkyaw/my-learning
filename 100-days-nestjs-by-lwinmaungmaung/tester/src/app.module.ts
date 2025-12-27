import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsResourceModule } from './cats-resource/cats-resource.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsResourceModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

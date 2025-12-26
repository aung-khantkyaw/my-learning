import { Module } from '@nestjs/common';
import { CatsResourceService } from './cats-resource.service';
import { CatsResourceController } from './cats-resource.controller';

@Module({
  controllers: [CatsResourceController],
  providers: [CatsResourceService],
})
export class CatsResourceModule {}

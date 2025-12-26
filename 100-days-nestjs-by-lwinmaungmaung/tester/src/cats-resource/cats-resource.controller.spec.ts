import { Test, TestingModule } from '@nestjs/testing';
import { CatsResourceController } from './cats-resource.controller';
import { CatsResourceService } from './cats-resource.service';

describe('CatsResourceController', () => {
  let controller: CatsResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsResourceController],
      providers: [CatsResourceService],
    }).compile();

    controller = module.get<CatsResourceController>(CatsResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CatsResourceService } from './cats-resource.service';

describe('CatsResourceService', () => {
  let service: CatsResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsResourceService],
    }).compile();

    service = module.get<CatsResourceService>(CatsResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

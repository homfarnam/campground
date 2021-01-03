import { Test, TestingModule } from '@nestjs/testing';
import { CampsService } from './camps.service';

describe('CampsService', () => {
  let service: CampsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampsService],
    }).compile();

    service = module.get<CampsService>(CampsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

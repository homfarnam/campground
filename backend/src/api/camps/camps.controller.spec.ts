import { Test, TestingModule } from '@nestjs/testing';
import { CampsController } from './camps.controller';

describe('CampsController', () => {
  let controller: CampsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampsController],
    }).compile();

    controller = module.get<CampsController>(CampsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

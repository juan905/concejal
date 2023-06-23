import { Test, TestingModule } from '@nestjs/testing';
import { VotantesController } from './votantes.controller';
import { VotantesService } from './votantes.service';

describe('VotantesController', () => {
  let controller: VotantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotantesController],
      providers: [VotantesService],
    }).compile();

    controller = module.get<VotantesController>(VotantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

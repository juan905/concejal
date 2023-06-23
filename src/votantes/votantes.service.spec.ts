import { Test, TestingModule } from '@nestjs/testing';
import { VotantesService } from './votantes.service';

describe('VotantesService', () => {
  let service: VotantesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotantesService],
    }).compile();

    service = module.get<VotantesService>(VotantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

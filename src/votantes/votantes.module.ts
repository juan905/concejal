import { Module } from '@nestjs/common';
import { VotantesService } from './votantes.service';
import { VotantesController } from './votantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Votante } from './entities/votante.entity';

@Module({
  controllers: [VotantesController],
  providers: [VotantesService],
  imports: [
    TypeOrmModule.forFeature([Votante])
  ]
})
export class VotantesModule {}

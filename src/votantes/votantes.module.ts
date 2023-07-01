import { Module } from '@nestjs/common';
import { VotantesService } from './votantes.service';
import { VotantesController } from './votantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Votante } from './entities/votante.entity';
import { Barrio } from './entities/barrio.entity';
import { Comuna } from './entities/comunas.entity';
import { PuestoVotacion } from './entities/puestoVotacion';

@Module({
  controllers: [VotantesController],
  providers: [VotantesService],
  imports: [
    TypeOrmModule.forFeature([Votante, Barrio, Comuna, PuestoVotacion]),
  ]
})
export class VotantesModule {}

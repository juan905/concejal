import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateVotanteDto } from './dto/create-votante.dto';
import { UpdateVotanteDto } from './dto/update-votante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Votante } from './entities/votante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VotantesService {


  constructor(
    @InjectRepository(Votante)
    private readonly votanteRepository: Repository<Votante>
  ){}


  async create(createVotanteDto: CreateVotanteDto) {

    try {

      const votante = this.votanteRepository.create(createVotanteDto);
      await this.votanteRepository.save(createVotanteDto);

      return votante;
      
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('ayuda')
    }
    
  }

  findAll() {
    return `This action returns all votantes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} votante`;
  }

  update(id: number, updateVotanteDto: UpdateVotanteDto) {
    return `This action updates a #${id} votante`;
  }

  remove(id: number) {
    return `This action removes a #${id} votante`;
  }
}

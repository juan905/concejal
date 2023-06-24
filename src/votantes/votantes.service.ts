import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateVotanteDto } from './dto/create-votante.dto';
import { UpdateVotanteDto } from './dto/update-votante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Votante } from './entities/votante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VotantesService {

  private readonly logger = new Logger('VotantesService');

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


    /**
   * Funcion para detectar el error
   * @param error 
   */
    errorServer(error: any){
      if (error) 
      throw new BadRequestException(error)
      
  
      if (error.code === '23505') 
      throw new BadRequestException(error.detail)
      this.logger.error(error)
      throw new InternalServerErrorException('Error inesperado, verifique los logs del servidor');
    }
}

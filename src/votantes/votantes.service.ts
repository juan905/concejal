import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateVotanteDto } from './dto/create-votante.dto';
import { UpdateVotanteDto } from './dto/update-votante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Votante } from './entities/votante.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Barrio } from './entities/barrio.entity';
import { Comuna } from './entities/comunas.entity';
import { FilterVotanteDto } from './dto/filter.dto';
import { PuestoVotacion } from './entities/puestoVotacion';
import { Municipios } from './entities/municipios.entity';

@Injectable()
export class VotantesService {

  private readonly logger = new Logger('VotantesService');

  constructor(
    @InjectRepository(Votante)
    private readonly votanteRepository: Repository<Votante>,

    @InjectRepository(Barrio)
    private readonly neigborhoodRepository: Repository<Barrio>,

    @InjectRepository(Comuna)
    private readonly comunaRepository: Repository<Comuna>,

    @InjectRepository(PuestoVotacion)
    private readonly puestoVotacion: Repository<PuestoVotacion>,

    @InjectRepository(Municipios)
    private readonly municipios: Repository<Municipios>

    
  ){}


  async create(createVotanteDto: CreateVotanteDto) {

    try {
      const votante = this.votanteRepository.create(createVotanteDto);
      await this.votanteRepository.save(createVotanteDto);

      return votante;
      
    } catch (error) {
      this.errorServer(error);
    }
    
  }

  async filterByNeighborhood(filterVotanteDto: FilterVotanteDto){
  
    try {
    const neigborhoods = await this.neigborhoodRepository.createQueryBuilder('barrio').where(`UPPER(barrio.nombreBarrio) like '%${filterVotanteDto.barrio}%'`).getMany();

    const response = [];

    for (const barrio of neigborhoods) {
      const comuna = await this.comunaRepository.findOne({
       where:{
        id: barrio.comuna
       }
      })

      const votantes = await this.votanteRepository.findBy({
        barrio: barrio.id
      })

      for (const votante of votantes) {
        response.push({
          ...votante,
          barrio: barrio.nombreBarrio,
          comuna: comuna.nombreComuna
        })
      }
    }
    

    return response;
      
    } catch (error) {
      console.log("error", error);
      
    }
  }


  async findAll() {
    try {
      const votantes = await this.votanteRepository.find();
          
      const response = [];

      
  
      for (const votante of votantes) {
        const barrio = await this.neigborhoodRepository.findOne({
          where: {
            id: votante.barrio
          }
        })

        const comuna = await this.comunaRepository.findOne({
         where:{
          id: barrio.comuna
         }
        })
  
          response.push({
            ...votante,
            barrio: barrio.nombreBarrio,
            comuna: comuna.nombreComuna
          })
        
      }
      
  
      return response;
        
      } catch (error) {
        console.log("error", error);
        
      }
  }

  /**
   * Trae todos los puestos de votacion de la ciudad de armenia
   * @returns 
   */

  async findPuestoVotacion(){
    try {
      const puesto = await this.puestoVotacion.find();
      return puesto;
    } catch (error) {
      this.errorServer(error);
    }
  }

  async findMunicipios(){
    try {
      const municipio = await this.municipios.find();
      return municipio
    } catch (error) {
      this.errorServer(error);
    }
  }

 async findOne(id: string) {
    const votante = await this.votanteRepository.findOneBy({id});

    if (!votante) 
      throw new NotFoundException(`El votante con el id #${id} no existe`);

    return votante;
  }

  update(id: string, updateVotanteDto: UpdateVotanteDto) {
    return `This action updates a #${id} votante`;
  }

  async remove(id: string) {
    const votante = await this.findOne(id)
    await this.votanteRepository.remove(votante);
  }



 async searchNeigborhood(filterVotanteDto: FilterVotanteDto){
    return await this.neigborhoodRepository.createQueryBuilder('barrio').where(`UPPER(barrio.nombreBarrio) like '%${filterVotanteDto.barrio}%'`).getMany();
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

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
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
import { log } from 'console';

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
    private readonly municipios: Repository<Municipios>,
  ) {}

  async create(createVotanteDto: CreateVotanteDto) {
    try {
      const votante = this.votanteRepository.create(createVotanteDto);
      await this.votanteRepository.save(createVotanteDto);

      return votante;
    } catch (error) {
      this.errorServer(error);
    }
  }

  async filterByNeighborhood(filterVotanteDto: FilterVotanteDto) {
    try {
      const { createConnection } = require('typeorm');

      const connection = await createConnection({
        type: 'postgres',
        host: process.env.DB_HOST, // Cambia esta dirección por la de tu servidor de PostgreSQL
        port: process.env.DB_PORT, // Cambia el puerto si es necesario
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl:true,
        synchronize: false, // Solo usar en desarrollo - Sincronizar automáticamente tus modelos con la base de datos
        logging: true, // Activa la salida de registro para mostrar las consultas SQL generadas por TypeORM (opcional, útil para depuración)
      })
        // Consulta SELECT con INNER JOIN
        const query = `
        SELECT votante.*, barrio."nombreBarrio" as barrio, comuna."nombreComuna" as comuna FROM votante inner join barrio on barrio.id::text = votante.barrio inner join comuna on comuna.id::text = barrio.comuna WHERE UPPER(barrio."nombreBarrio") like '%${filterVotanteDto.barrio}%';
            `;
        const result = await connection.query(query);
        connection.close()
        return result;
      
    } catch (error) {
      console.log('error', error);
    }
  }

  async findAll() {
    try {
      const { createConnection } = require('typeorm');

      const connection = await createConnection({
        type: 'postgres',
        host: process.env.DB_HOST, // Cambia esta dirección por la de tu servidor de PostgreSQL
        port: process.env.DB_PORT, // Cambia el puerto si es necesario
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl:true,
        synchronize: false, // Solo usar en desarrollo - Sincronizar automáticamente tus modelos con la base de datos
        logging: true, // Activa la salida de registro para mostrar las consultas SQL generadas por TypeORM (opcional, útil para depuración)
      })
        // Consulta SELECT con INNER JOIN
        const query = `
      SELECT votante.id, votante."nombre", votante."nombreLider", votante.cedula, votante."telefono", votante."lugarVotacion", votante."mesaVotacion", votante."aliado", votante."municipio", barrio."nombreBarrio", votante."direccion", comuna."nombreComuna" FROM votante inner join barrio on barrio.id::text = votante.barrio inner join comuna on comuna.id::text = barrio.comuna
            `;
        const result = await connection.query(query);
        connection.close();
        return result;
      
    } catch (error) {
      console.log('error', error);
    }
  }

  /**
   * Trae todos los puestos de votacion de la ciudad de armenia
   * @returns
   */

  async findPuestoVotacion() {
    try {
      const puesto = await this.puestoVotacion.find();
      return puesto;
    } catch (error) {
      this.errorServer(error);
    }
  }

  async findMunicipios() {
    try {
      const municipio = await this.municipios.find();
      return municipio;
    } catch (error) {
      this.errorServer(error);
    }
  }

  async findOne(id: string) {
    const votante = await this.votanteRepository.findOneBy({ id });

    if (!votante)
      throw new NotFoundException(`El votante con el id #${id} no existe`);

    return votante;
  }

  update(id: string, updateVotanteDto: UpdateVotanteDto) {
    return `This action updates a #${id} votante`;
  }

  async remove(id: string) {
    const votante = await this.findOne(id);
    await this.votanteRepository.remove(votante);
  }

  async searchNeigborhood(filterVotanteDto: FilterVotanteDto) {
    return await this.neigborhoodRepository
      .createQueryBuilder('barrio')
      .where(`UPPER(barrio.nombreBarrio) like '%${filterVotanteDto.barrio}%'`)
      .getMany();
  }

  /**
   * Funcion para detectar el error
   * @param error
   */
  errorServer(error: any) {
    if (error) throw new BadRequestException(error);

    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Error inesperado, verifique los logs del servidor',
    );
  }
}

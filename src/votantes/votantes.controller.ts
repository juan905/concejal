import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { VotantesService } from './votantes.service';
import { CreateVotanteDto } from './dto/create-votante.dto';
import { UpdateVotanteDto } from './dto/update-votante.dto';
import { FilterVotanteDto } from './dto/filter.dto';

@Controller('votantes')
export class VotantesController {
  constructor(private readonly votantesService: VotantesService) {}

  @Post()
  create(@Body() createVotanteDto: CreateVotanteDto) {
    return this.votantesService.create(createVotanteDto);
  }

  @Get()
  findAll() {
    return this.votantesService.findAll();
  }

  @Get('/get/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.votantesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVotanteDto: UpdateVotanteDto) {
    return this.votantesService.update(id, updateVotanteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.votantesService.remove(id);
  }

  @Post('/filter')
  filter(@Body()filterVotanteDto: FilterVotanteDto){

    return this.votantesService.filterByNeighborhood(filterVotanteDto);

  }

  @Post('/filter/neigborhoods')
  filterNeigborhood(@Body()filterVotanteDto: FilterVotanteDto){
    return this.votantesService.searchNeigborhood(filterVotanteDto);
  }

  @Get('/puestoVotacion')
  encontrarPuestoVotacion(){
    return this.votantesService.findPuestoVotacion()
  }

}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { GasStationService } from './gas-station.service';
import { CreateGasStationDto } from './dto/create-gas-station.dto';
import { UpdateGasStationDto } from './dto/update-gas-station.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('gas-station')
@Controller('gas-station')
export class GasStationController {
  constructor(private readonly gasStationService: GasStationService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo posto' })
  @ApiResponse({ status: 201, description: 'Posto criado com sucesso' })
  create(@Body() createPostoDto: CreateGasStationDto) {
    return this.gasStationService.create(createPostoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os postos' })
  findAll() {
    return this.gasStationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um posto pelo ID' })
  findOne(@Param('id') id: string) {
    return this.gasStationService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um posto' })
  @ApiResponse({ status: 200, description: 'Posto atualizado com sucesso' })
  update(@Param('id') id: string, @Body() updateGasStationDto: UpdateGasStationDto) {
    return this.gasStationService.update(+id, updateGasStationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um posto' })
  remove(@Param('id') id: string) {
    return this.gasStationService.remove(+id);
  }
}

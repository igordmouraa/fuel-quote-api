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
  @ApiOperation({ summary: 'Create a new gas station' })
  @ApiResponse({ status: 201, description: 'Gas station created successfully' })
  create(@Body() createGasStationDto: CreateGasStationDto) {
    return this.gasStationService.create(createGasStationDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all gas stations' })
  findAll() {
    return this.gasStationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a gas station by ID' })
  findOne(@Param('id') id: string) {
    return this.gasStationService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a gas station by ID' })
  @ApiResponse({ status: 200, description: 'Gas station updated successfully' })
  update(@Param('id') id: string, @Body() updateGasStationDto: UpdateGasStationDto) {
    return this.gasStationService.update(+id, updateGasStationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a gas station by ID' })
  remove(@Param('id') id: string) {
    return this.gasStationService.remove(+id);
  }
}

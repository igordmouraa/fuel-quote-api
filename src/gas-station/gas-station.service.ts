import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GasStation } from './entities/gas-station.entity';
import { CreateGasStationDto } from './dto/create-gas-station.dto';
import { UpdateGasStationDto } from './dto/update-gas-station.dto';

@Injectable()
export class GasStationService {
  constructor(
    @InjectRepository(GasStation)
    private gas_stationRepository: Repository<GasStation>,
  ) {}

  async create(createGasStationDto: CreateGasStationDto) {
    return this.gas_stationRepository.save(createGasStationDto);
  }

  async findAll() {
    return this.gas_stationRepository.find();
  }

  async findOne(id: number) {
    const gasStation = await this.gas_stationRepository.findOneBy({ id });
    if (!gasStation) {
      throw new NotFoundException('Gas station not found');
    }
    return gasStation;
  }

  async update(id: number, updateGasStationDto: UpdateGasStationDto) {
    const result = await this.gas_stationRepository.update(id, updateGasStationDto);
    if (result.affected === 0) {
      throw new NotFoundException('Gas station not found');
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.gas_stationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Gas station not found');
    }
    return { message: 'Gas station removed successfully' };
  }
}
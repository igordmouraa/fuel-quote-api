import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In } from 'typeorm';
import { Quotation } from './entities/quotation.entity';
import { GasStation } from '../gas-station/entities/gas-station.entity';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { ReportDto } from './dto/report.dto';

@Injectable()
export class QuotationService {
  constructor(
    @InjectRepository(Quotation)
    private quotationRepository: Repository<Quotation>,
    @InjectRepository(GasStation)
    private gasStationRepository: Repository<GasStation>,
  ) {}

  async create(createQuotationDto: CreateQuotationDto) {
    const gasStation = await this.gasStationRepository.findOneBy({
      id: createQuotationDto.gas_station,
    });

    if (!gasStation) {
      throw new Error('Gas station not found');
    }

    const quotation = this.quotationRepository.create({
      ...createQuotationDto,
      gas_station: gasStation,
    });

    return this.quotationRepository.save(quotation);
  }

  findAll() {
    return this.quotationRepository.find({ relations: ['gas_station'] });
  }

  findOne(id: number) {
    return this.quotationRepository.findOne({
      where: { id },
      relations: ['gas_station'],
    });
  }

  async generateReport(reportDto: ReportDto) {
    const { gasType, initialDate, finalDate, city } = reportDto;

    const where: any = {
      gasType,
      date: Between(initialDate, finalDate),
    };

    if (city) {
      const gasStations = await this.gasStationRepository.find({
        where: { city },
      });
      where.gas_station = { id: In(gasStations.map((station) => station.id)) };
    }

    const quotations = await this.quotationRepository.find({
      where,
      relations: ['gas_station'],
      order: { date: 'ASC' },
    });

    const total = quotations.reduce((sum, quotation) => sum + quotation.price, 0);

    return {
      quotations: quotations.map((quotation) => ({
        gasType: quotation.gasType,
        date: quotation.date,
        price: quotation.price,
        gasStation: quotation.gas_station.name,
      })),
      total,
    };
  }
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quotation } from './entities/quotation.entity';
import { GasStation } from '../gas-station/entities/gas-station.entity';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Quotation, GasStation])],
  controllers: [QuotationController],
  providers: [QuotationService],
})
export class QuotationModule {}
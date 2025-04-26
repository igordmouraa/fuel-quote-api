import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GasStation } from './entities/gas-station.entity';
import { GasStationController } from './gas-station.controller';
import { GasStationService } from './gas-station.service';

@Module({
  imports: [TypeOrmModule.forFeature([GasStation])],
  controllers: [GasStationController],
  providers: [GasStationService],
})
export class GasStationModule {}

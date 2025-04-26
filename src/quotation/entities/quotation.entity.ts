// quotation.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { GasStation } from '../../gas-station/entities/gas-station.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum GasType {
  GASOLINE = 'gasoline',
  ETHANOL = 'ethanol',
  DIESEL = 'diesel',
}

@Entity()
export class Quotation {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => GasStation, (gasStation) => gasStation.quotations)
  @JoinColumn()
  @ApiProperty({ type: () => GasStation })
  gas_station: GasStation;

  @Column({
    type: 'enum',
    enum: GasType,
  })
  @ApiProperty({ enum: GasType })
  gasType: GasType;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty()
  price: number;

  @Column()
  @ApiProperty()
  date: Date;
}
// gas-station.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Quotation } from '../../quotation/entities/quotation.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class GasStation {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  city: string;

  @Column()
  @ApiProperty()
  state: string;

  @OneToMany(() => Quotation, (quotation) => quotation.gas_station)
  @ApiProperty({ type: () => Quotation, isArray: true })
  quotations: Quotation[];
}
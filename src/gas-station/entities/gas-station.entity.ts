import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

  @CreateDateColumn()
  @ApiProperty({ type: String })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ type: String })
  updatedAt: Date;
}
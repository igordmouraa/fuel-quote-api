import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsDateString, IsNotEmpty, Min } from 'class-validator';
import { GasType } from '../entities/quotation.entity';

export class CreateQuotationDto {
  @ApiProperty()
  @IsNotEmpty()
  gas_station: number;

  @ApiProperty({ enum: GasType })
  @IsEnum(GasType)
  gasType: GasType;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsDateString()
  date: Date;
}
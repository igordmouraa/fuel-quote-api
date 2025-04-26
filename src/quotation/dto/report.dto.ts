import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, ValidateIf } from 'class-validator';
import { GasType } from '../entities/quotation.entity';

export class ReportDto {
  @ApiProperty()
  @IsDateString()
  initialDate: Date;

  @ApiProperty()
  @IsDateString()
  finalDate: Date;

  @ApiProperty({ enum: GasType })
  @IsEnum(GasType)
  gasType: GasType;

  @ApiProperty()
  @IsDateString()
  city: string;

  @ValidateIf((o) => o.initialDate > o.finalDate)
  validateDates() {
    throw new Error('initialDate must be before finalDate');
  }
}

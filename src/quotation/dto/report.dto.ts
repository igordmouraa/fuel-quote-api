import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { GasType } from '../entities/quotation.entity';
import { IsBeforeConstraint } from '../../utils/date-validator';

export class ReportDto {
  @ApiProperty({
    description: 'Data inicial do relatório',
    example: '2025-04-01T00:00:00.000Z',
  })
  @IsDateString()
  initialDate: string;

  @ApiProperty({
    description: 'Data final do relatório',
    example: '2025-04-30T23:59:59.999Z',
  })
  @IsDateString()
  @Validate(IsBeforeConstraint, ['initialDate'])
  finalDate: string;

  @ApiProperty({
    enum: GasType,
    enumName: 'GasType',
    example: 'gasoline',
  })
  @IsEnum(GasType)
  gasType: GasType;

  @ApiProperty({
    description: 'Cidade para filtrar os postos',
    required: false,
    example: 'Franca',
  })
  @IsOptional()
  @IsString()
  city?: string;
}

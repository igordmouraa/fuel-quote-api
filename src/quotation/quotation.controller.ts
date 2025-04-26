import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { ReportDto } from './dto/report.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('quotation')
@Controller('quotation')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quotation' })
  @ApiResponse({ status: 201, description: 'Quotation created successfully' })
  create(@Body() createQuotationDto: CreateQuotationDto) {
    return this.quotationService.create(createQuotationDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all quotations' })
  findAll() {
    return this.quotationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quotation by ID' })
  findOne(@Param('id') id: string) {
    return this.quotationService.findOne(+id);
  }

  @Post('report')
  @ApiOperation({ summary: 'Generate a report based on filters' })
  generateReport(@Body() reportDto: ReportDto) {
    return this.quotationService.generateReport(reportDto);
  }
}
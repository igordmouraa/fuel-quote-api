import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { GasStationModule } from './gas-station/gas-station.module';
import { QuotationModule } from './quotation/quotation.module';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    GasStationModule,
    QuotationModule,
    TerminusModule
  ],
  controllers: [AppController],
})
export class AppModule {}

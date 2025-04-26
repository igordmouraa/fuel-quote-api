import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GasStationModule } from './gas-station/gas-station.module';
import { QuotationModule } from './quotation/quotation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    DatabaseModule,
    GasStationModule,
    QuotationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

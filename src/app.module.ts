import { Module } from '@nestjs/common';
import { PropertiesModule } from './properties/properties.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { TransactionsModule } from './transactions/transactions.module';
import { ListingsModule } from './listings/listings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    PropertiesModule,
    TransactionsModule,
    ListingsModule
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transaction.service';
import { TransactionsController } from './controllers/transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entity/transactions.entity';
import { PropertyEntity } from 'src/properties/entity/properties.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity, PropertyEntity])],
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsModule {}



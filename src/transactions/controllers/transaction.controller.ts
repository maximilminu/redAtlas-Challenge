import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TransactionsService } from '../services/transaction.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { UUID } from 'crypto';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionService: TransactionsService) {}

    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto) {
      return this.transactionService.create(createTransactionDto);
    }
  
    @Get()
    findAll() {
      return this.transactionService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: UUID) {
      return this.transactionService.findByID(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: UUID, @Body() updateTransactionDto: UpdateTransactionDto) {
      return this.transactionService.update(id, updateTransactionDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: UUID) {
      return this.transactionService.remove(id);
    }

    @Get('say-hello')
    getHello(): string {
      return this.transactionService.getHello();
    }
}

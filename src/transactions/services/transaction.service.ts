import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { UUID } from 'crypto';
import { TransactionEntity } from '../entity/transactions.entity';
import { PropertyEntity } from 'src/properties/entity/properties.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {}

  
  
  async create(createTransactionDto: CreateTransactionDto) {
    const { propertyId, ...transactionData } = createTransactionDto;

    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
    });
    
    if (!property) {
      throw new NotFoundException(`Property with ID ${propertyId} not found`);
    }
  
    const transaction = this.transactionRepository.create({
      ...transactionData,
      property,
    });
  
    return await this.transactionRepository.save(transaction);
  }

  async findAll() {
    const transactions = await this.transactionRepository.find();
    return transactions;
  }

  async findByID(id: UUID) {
    return await this.transactionRepository.findOne({
      where: { id },
    });
  }

  async update(id: UUID, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.findByID(id);

    if (!transaction) {
      throw new NotFoundException();
    }

    Object.assign(transaction, updateTransactionDto);

    return await this.transactionRepository.save(transaction);
  }

  async remove(id: UUID) {
    const transaction = await this.findByID(id);

    if (!transaction) {
      throw new NotFoundException();
    }

    return await this.transactionRepository.remove(transaction);
  }
  getHello(): string {
    return 'Hello Transactions!';
  }
}

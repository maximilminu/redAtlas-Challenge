import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ListingsService } from '../services/listings.service';
import { CreateListingDto } from '../dto/create-listing.dto';
import { UpdateTransactionDto } from 'src/transactions/dto/update-transaction.dto';
import { UUID } from 'crypto';

@Controller('listings')
export class ListingsController {
    constructor(private readonly listingService: ListingsService) {}

    @Post()
    create(@Body() createListingDto: CreateListingDto) {
      return this.listingService.create(createListingDto);
    }
  
    @Get()
    findAll() {
      return this.listingService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: UUID) {
      return this.listingService.findByID(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: UUID, @Body() updateTransactionDto: UpdateTransactionDto) {
      return this.listingService.update(id, updateTransactionDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: UUID) {
      return this.listingService.remove(id);
    }

    @Get('say-hello')
    getHello(): string {
      return this.listingService.getHello();
    }
}

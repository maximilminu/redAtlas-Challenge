import { Module } from '@nestjs/common';
import { ListingsService } from './services/listings.service';
import { ListingsController } from './controllers/listings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingEntity } from './entity/listings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListingEntity])],
  providers: [ListingsService],
  controllers: [ListingsController]
})
export class ListingsModule {}

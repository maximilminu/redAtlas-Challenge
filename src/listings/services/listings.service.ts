import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingEntity } from '../entity/listings.entity';
import { Repository } from 'typeorm';
import { CreateListingDto } from '../dto/create-listing.dto';
import { UUID } from 'crypto';
import { UpdateListingDto } from '../dto/update-listing.dto';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(ListingEntity)
    private readonly listingRepository: Repository<ListingEntity>,
  ) {}

  async create(createListingDto: CreateListingDto) {
    const listing = this.listingRepository.create(createListingDto);

    return await this.listingRepository.save(listing);
  }

  async findAll() {
    const listing = await this.listingRepository.find();
    return listing;
  }

  async findByID(id: UUID) {
    return await this.listingRepository.findOne({
      where: { id },
    });
  }

  async update(id: UUID, updateListingDto: UpdateListingDto) {
    const listing = await this.findByID(id);

    if (!listing) {
      throw new NotFoundException();
    }

    Object.assign(listing, updateListingDto);

    return await this.listingRepository.save(listing);
  }

  async remove(id: UUID) {
    const listing = await this.findByID(id);

    if (!listing) {
      throw new NotFoundException();
    }

    return await this.listingRepository.remove(listing);
  }

  getHello(): string {
    return 'Hello Listings!';
  }
}

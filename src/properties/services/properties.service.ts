import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyEntity } from '../entity/properties.entity';
import { Repository } from 'typeorm';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { UUID } from 'crypto';
import { FilterPropertiesDto } from '../dto/filter-properties.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertiesRepository: Repository<PropertyEntity>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    const property = this.propertiesRepository.create(createPropertyDto);

    return await this.propertiesRepository.save(property);
  }

  async findAll() {
    const properties = await this.propertiesRepository.find();
    return properties;
  }

  async findByID(id: UUID) {
    return await this.propertiesRepository.findOne({
      where: { id },
    });
  }

  async update(id: UUID, updatePropertyDto: UpdatePropertyDto) {
    const property = await this.findByID(id);

    if (!property) {
      throw new NotFoundException();
    }

    Object.assign(property, updatePropertyDto);

    return await this.propertiesRepository.save(property);
  }

  async remove(id: UUID) {
    const property = await this.findByID(id);

    if (!property) {
      throw new NotFoundException();
    }

    return await this.propertiesRepository.remove(property);
  }

  async findWithFilters(filters: FilterPropertiesDto) {
    const {
      name,
      ownerName,
      sector,
      minArea,
      maxArea,
      transactionType,
      orderBy = 'ASC',
      page = 1,
      limit = 10,
    } = filters;

    const query = this.propertiesRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.transactions', 'transaction');

    if (name) {
      query.andWhere('property.name ILIKE :name', { name: `%${name}%` });
    }
    if (ownerName) {
      query.andWhere('property.ownerName ILIKE :ownerName', {
        ownerName: `%${ownerName}%`,
      });
    }
    if (sector) {
      query.andWhere('property.sector ILIKE :sector', {
        sector: `%${sector}%`,
      });
    }
    if (minArea) {
      query.andWhere('CAST(property.area AS NUMERIC) >= :minArea', { minArea });
    }
    if (maxArea) {
      query.andWhere('CAST(property.area AS NUMERIC) <= :maxArea', { maxArea });
    }
    if (transactionType) {
      query.andWhere('transaction.type = :transactionType', {
        transactionType,
      });
    }

    query.orderBy('property.name', orderBy);

    console.log("QUERY: ", query)

    const [results, total] = await query
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();

    return {
      total,
      page,
      limit,
      results,
    };
  }

  // async findAllPropertiesWithValuation(page: number, limit: number): Promise<any[]> {
  //   const skip = (page - 1) * limit;
  
  //   const properties = await this.propertiesRepository
  //     .createQueryBuilder('property')
  //     .select('property.id', 'id')
  //     .addSelect('property.name', 'name')
  //     .addSelect('property.address', 'address')
  //     .addSelect('property.metros2', 'metros2')
  //     .addSelect('property.sector', 'sector')
  //     .addSelect(
  //       'COALESCE(AVG(otherProperty.area / otherProperty.metros2), 0) * property.metros2',
  //       'valuation'
  //     )
  //     .leftJoin(
  //       'properties',
  //       'otherProperty',
  //       'otherProperty.sector = property.sector'
  //     )
  //     .groupBy('property.id')
  //     .skip(skip)
  //     .take(limit)
  //     .getRawMany();
  
  //   return properties;
  // }

  getHello(): string {
    return 'Hello Properties!';
  }
}

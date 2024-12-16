import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PropertiesService } from '../services/properties.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UUID } from 'crypto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { FilterPropertiesDto } from '../dto/filter-properties.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get(':id')
  findByID(@Param('id') id: UUID) {
    return this.propertiesService.findByID(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: UUID,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.propertiesService.remove(id);
  }

  @Get()
  async findWithFilters(@Query() filters: FilterPropertiesDto) {
    console.log('Calling find with filters in PropertiesController');
    return await this.propertiesService.findWithFilters(filters);
  }

  // async getPropertiesWithValuation(
  //   @Query('page') page: number = 1,
  //   @Query('limit') limit: number = 10
  // ) {
  //   return await this.propertiesService.findAllPropertiesWithValuation(page, limit);
  // }

  @Get('say-hello')
  getHello(): string {
    return this.propertiesService.getHello();
  }
}

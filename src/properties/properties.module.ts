import { Module } from '@nestjs/common';
import { PropertiesService } from './services/properties.service';
import { PropertiesController } from './controllers/properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from './entity/properties.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyEntity])],
  providers: [PropertiesService],
  controllers: [PropertiesController]
})
export class PropertiesModule {}

import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class FilterPropertiesDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  ownerName?: string;

  @IsOptional()
  @IsString()
  sector?: string;

  @IsOptional()
  @IsNumber()
  minArea?: number;

  @IsOptional()
  @IsNumber()
  maxArea?: number;

  @IsOptional()
  @IsString()
  transactionType?: string;

  @IsOptional()
  @IsEnum(OrderDirection)
  orderBy?: OrderDirection;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
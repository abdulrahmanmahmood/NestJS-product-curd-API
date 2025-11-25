import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryProductDto {
  @IsOptional()
  @IsNumber()
  page?: number;
  @IsOptional()
  @IsNumber()
  limit?: number;
  @IsOptional()
  @IsString()
  category?: string;
  @IsOptional()
  @IsNumber()
  minPrice?: number;
  @IsOptional()
  @IsNumber()
  maxPrice?: number;
  @IsOptional()
  @IsString()
  search?: string;
  @IsOptional()
  @IsEnum(['name', 'price', 'createdAt'])
  sortBy?: 'name' | 'price' | 'createdAt';
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';
}

import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // =============================================
  // Get All Products with Filtering & Pagination
  // =============================================
  /**
   *  GET / products
   *  GET /prdoucts?page=1&limit=10
   *  GET /prdoucts?category=Electonics
   *  GET /prdoucts?minPrice=50&maxPrice=500
   *  GET /prdoucts?search=laptop
   *  GET /prdoucts?sortBy=price&order=DESC
   *
   */
  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }
}

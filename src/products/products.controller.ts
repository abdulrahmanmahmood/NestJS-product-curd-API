import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';
import { QueryProductDto } from './dto/query-products.dto';
import { filter } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // =============================================
  // Get All Products with Filtering & Pagination
  // =============================================
  /**
   *  GET / products
   *  GET /products?page=1&limit=10
   *  GET /products?category=Electonics
   *  GET /products?minPrice=50&maxPrice=500
   *  GET /products?search=laptop
   *  GET /products?sortBy=price&order=DESC
   *
   */
  @Get()
  findAll(@Query() query: QueryProductDto): Product[] {
    console.log('query ', query);
    const {
      order = 'ASC',
      category,
      limit = 10,
      maxPrice,
      minPrice,
      page = 1,
      search,
      sortBy = 'createdAt',
    } = query;
    let filteredProducts: Product[] = [...this.productsService.findAll()];

    if (category) {
      // Filtering by category logic here
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category.toLocaleLowerCase() === category.toLocaleLowerCase(),
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice,
      );
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice,
      );
    }
    if (search) {
      const searchLower = search.toLowerCase();
      console.log('searchLower', searchLower);
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower),
      );
    }

    return filteredProducts;
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';
import { QueryProductDto } from './dto/query-products.dto';
import { CreateProductDto } from './dto/create-product.dto';

interface PaginatedProducts {
  success: boolean;
  message: string;
  data: Product[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    itemsPerPage: number;
  };
}

interface ProductResponse {
  success: boolean;
  message: string;
  data: Product;
}

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
  findAll(@Query() query: QueryProductDto): PaginatedProducts {
    console.log('query ', query);
    const {
      order = 'ASC',
      category,
      maxPrice,
      minPrice,
      limit = 10,
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

    // Pagination
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / limit);
    const curentPage = Number(page);
    // Validate page number
    if (curentPage < 1 || curentPage > totalPages) {
      throw new BadRequestException(
        'Invalid page number, Must be between 1 and ' + totalPages,
      );
    }
    const startIndex = (curentPage - 1) * limit;
    const endIndex = startIndex + Number(limit);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      success: true,
      message: 'Products retrieved successfully',
      data: paginatedProducts,
      meta: {
        totalItems,
        totalPages,
        currentPage: curentPage,
        hasNextPage: curentPage < totalPages,
        hasPrevPage: curentPage > 1,
        itemsPerPage: Number(limit),
      },
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): ProductResponse {
    const productId = +id;
    if (isNaN(productId)) {
      throw new BadRequestException('Invalid product ID');
    }
    const product = this.productsService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product with ID ' + id + ' not found');
    }
    return {
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    };
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): ProductResponse {
    return {
      success: true,
      message: 'Product created successfully',
      data: {
        id: this.productsService.findAll().length + 1 + '',
        name: createProductDto.name,
        description: createProductDto.description || '',
        price: createProductDto.price,
        stock: createProductDto.stock,
        category: createProductDto.category,
        isActive: createProductDto.isActive,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
  }
}

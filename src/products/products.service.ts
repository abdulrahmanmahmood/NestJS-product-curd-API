import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  findAll(): Product[] {
    return [
      {
        id: '1',
        name: 'Sample Product',
        category: 'Electronics',
        price: 199.99,
        createdAt: new Date(),
        description: 'A sample product description',
        isActive: true,
        stock: 50,
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Another Product',
        category: 'Books',
        price: 29.99,
        createdAt: new Date(),
        description: 'Another product description',
        isActive: true,
        stock: 100,
        updatedAt: new Date(),
      },
      {
        id: '3',
        name: 'Third Product',
        category: 'Clothing',
        price: 49.99,
        createdAt: new Date(),
        description: 'Third product description',
        isActive: true,
        stock: 75,
        updatedAt: new Date(),
      },
    ];
  }

  findOne(id: number): Product | undefined {
    return this.findAll().find((product) => +product.id === id);
  }
}

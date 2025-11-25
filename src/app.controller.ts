import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('info')
  getInfo(): {
    app: string;
    version: string;
    description: string;
    environment: string;
  } {
    return {
      app: 'My NestJS Application',
      version: '1.0.0',
      description: 'This is a sample NestJS application controller.',
      environment: process.env.NODE_ENV || 'development',
    };
  }
}

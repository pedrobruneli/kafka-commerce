import { Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async createOrder() {
    return await this.orderService.createOrder();
  }

  @Get()
  async getOrders() {}
}

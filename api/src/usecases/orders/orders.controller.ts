import { Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'orders',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'orders-producer',
      },
      producer: {
        allowAutoTopicCreation: true,
      },
    },
  })
  private readonly client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('mailer-send');
    await this.client.connect();
  }

  onModuleDestroy() {
    this.client.close();
  }
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async createOrder() {
    return await this.orderService.createOrder(this.client);
  }
}

import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'orders',
        brokers: ['localhost:29092'],
      },
    },
  })
  private readonly client: ClientKafka;

  async createOrder() {
    this.client
      .emit('mailer-send', { value: 'test' })
      .subscribe((res) => console.log(res));
  }
}

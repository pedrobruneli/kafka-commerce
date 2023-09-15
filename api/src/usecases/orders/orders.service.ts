import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  async createOrder(client: ClientKafka) {
    client
      .send('mailer-send', { value: 'test' })
      .subscribe((res) => console.log(res));
  }
}

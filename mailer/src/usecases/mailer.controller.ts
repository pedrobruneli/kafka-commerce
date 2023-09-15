import { Controller } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';

@Controller('mailer')
export class MailerController {
  constructor() {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'mailer-consumer',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'teste-grupo',
        allowAutoTopicCreation: true,
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('mailer-send');
    await this.client.connect();
  }

  onModuleDestroy() {
    this.client.close();
  }

  @MessagePattern('mailer-send')
  sendMail(@Payload() message: any) {
    console.log(message);
    return 'Mail sent';
  }
}

import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const config: MicroserviceOptions = {
  transport: Transport.KAFKA,

  options: {
    client: {
      clientId: 'mailer',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'mailer-consumer',
      allowAutoTopicCreation: true,
    },
  },
};

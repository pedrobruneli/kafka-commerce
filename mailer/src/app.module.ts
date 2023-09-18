import { Module } from '@nestjs/common';
import { MailerModule } from './usecases/mailer.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MailerModule,
    ClientsModule.register([
      {
        name: 'MAILER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'mailer',
            brokers: ['localhost:29092'],
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MailerModule } from './usecases/mailer.module';

@Module({
  imports: [MailerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

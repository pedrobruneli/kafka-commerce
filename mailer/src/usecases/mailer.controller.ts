import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('mailer')
export class MailerController {
  constructor() {}

  @MessagePattern('mailer-send')
  sendMail(@Payload() message: any) {
    console.log(message);
    return 'Mail sent';
  }
}

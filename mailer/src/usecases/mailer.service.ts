import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  constructor() {}

  sendMail() {
    return 'Mail sent';
  }
}

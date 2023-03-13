import { Injectable } from '@nestjs/common';
import * as Mailgun from 'mailgun-js';
import { ConfigService } from '@nestjs/config';
import { MailGunData } from './interfaces/mail.interface';

@Injectable()
export class MailService {
  private mg: Mailgun.Mailgun;

  constructor(private readonly configService: ConfigService) {
    this.mg = Mailgun({
      apiKey: this.configService.get<string>('MAILGUNKEY'),
      domain: this.configService.get<string>('MAILGUNDOMAIN'),
    });
  }

  send(data: MailGunData): Promise<Mailgun.messages.SendResponse> {
    return new Promise((resolve, reject) => {
      this.mg.messages().send(data, function (error, body) {
        if (error) {
          reject(error);
        }

        resolve(body);
      });
    });
  }
}

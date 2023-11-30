import { Injectable } from '@angular/core';
import { createTransport } from 'nodemailer';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  async sendEmail(subject: string, text: string, to: string) {
    try {
      const transporter = createTransport({
        service: 'Gmail',
        auth: {
          user: 'futfinder8@gmail.com',
          pass: 'qcaw eblw qlhg nsax'
        }
      });

      const mailOptions = {
        from: 'futfinder8@gmail.com',
        to: to,
        subject: subject,
        text: text
      };

      const info = await transporter.sendMail(mailOptions);

      console.log('Correo electrónico enviado:', info.response);
      return true;
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      return false;
    }
  }
}

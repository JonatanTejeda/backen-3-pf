import nodemailer from "nodemailer";
import { config } from "../config/config.js";
import __dirname from "../dirname.js";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mailer.host,
      port: config.mailer.port,
      auth: config.mailer.auth,
    });
  }

  getMessageTemplate(type, mail) {
    let body = `<h1>Hola ${mail},</h1>`;

    switch (type) {
      case "welcome":
        body += `        
        <p style="font-size: 16px; color: #333">Te damos la bienvenida a nuestra tienda de PC.</p>
        
        <p style="font-size: 16px; color: #ff6600">Si tienes alguna pregunta, no dudes en contactarnos.</p>
        `;
        break;

      case "activation":
        body += `        
        <p style="font-size: 16px; color: #333">Tu cuenta ha sido activada exitosamente.</p>
        
        <p style="font-size: 16px; color: #ff6600">Si tienes alguna pregunta, no dudes en contactarnos.</p>
        `;
        break;
    }

    body += `        
    <p style="font-size: 16px; color: #ff6600">Saludos,</p>
    <p style="font-size: 16px; color: #ff6600">Tu tecnico de confianza JFTC.PCS</p>
    `;

    return body;
  }

  async sendMail({ to, subject, type }) {
    const message = this.getMessageTemplate(type, to);

    const info = await this.transporter.sendMail({
      from: '"Equipo de Tu Tienda de PC" <JFTC.PCS@gmail.com>', 
      to,
      subject,
      html: message,
    });
  }
}

export const mailService = new MailService();

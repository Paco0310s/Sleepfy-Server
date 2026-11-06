import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envs } from 'src/config/envs';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    if (envs.smtpUser && envs.smtpPass) {
      this.transporter = nodemailer.createTransport({
        host: envs.smtpHost || 'smtp.gmail.com',
        port: envs.smtpPort || 587,
        secure: envs.smtpPort === 465,
        auth: {
          user: envs.smtpUser.trim(),
          pass: envs.smtpPass.replace(/\s+/g, ''),
        },
      });
    } else {
      this.logger.warn(
        'SMTP_USER / SMTP_PASS no configurados en .env. Los códigos de verificación se mostrarán en la consola del servidor.',
      );
    }
  }

  async sendVerificationEmail(email: string, name: string, code: string): Promise<boolean> {
    this.logger.log(`[VERIFICACIÓN DE CORREO] Para: ${email} | Código: ${code}`);

    if (!this.transporter) return false;

    const html = this.buildEmailTemplate({
      title: 'Verifica tu cuenta en Sleepfy 🌙',
      greeting: `Hola ${name},`,
      body: 'Gracias por unirte a Sleepfy. Ingresa el siguiente código de 6 dígitos en la aplicación para confirmar tu correo electrónico y activar tu espacio de descanso:',
      code,
      footer: 'Este código expirará en 15 minutos. Si no creaste esta cuenta, puedes ignorar este mensaje.',
    });

    try {
      await this.transporter.sendMail({
        from: `"Sleepfy" <${envs.smtpUser.trim()}>`,
        to: email,
        subject: `${code} es tu código de verificación de Sleepfy`,
        html,
      });
      return true;
    } catch (error) {
      this.logger.error(`Error al enviar correo de verificación a ${email}: ${error}`);
      return false;
    }
  }

  async sendPasswordResetEmail(email: string, name: string, code: string): Promise<boolean> {
    this.logger.log(`[RECUPERACIÓN DE CONTRASEÑA] Para: ${email} | Código: ${code}`);

    if (!this.transporter) return false;

    const html = this.buildEmailTemplate({
      title: 'Restablece tu contraseña 🔑',
      greeting: `Hola ${name},`,
      body: 'Recibimos una solicitud para restablecer la contraseña de tu cuenta en Sleepfy. Usa este código de 6 dígitos en la aplicación para elegir tu nueva contraseña:',
      code,
      footer: 'Este código es válido por 15 minutos. Si no solicitaste este cambio, tu cuenta sigue segura y puedes ignorar este correo.',
    });

    try {
      await this.transporter.sendMail({
        from: `"Sleepfy" <${envs.smtpUser.trim()}>`,
        to: email,
        subject: `${code} - Código para restablecer tu contraseña en Sleepfy`,
        html,
      });
      return true;
    } catch (error) {
      this.logger.error(`Error al enviar correo de recuperación a ${email}: ${error}`);
      return false;
    }
  }

  private buildEmailTemplate(params: {
    title: string;
    greeting: string;
    body: string;
    code: string;
    footer: string;
  }): string {
    return `
      <div style="background-color:#0B101E;padding:36px 16px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#F8FAFC;">
        <div style="max-width:480px;margin:0 auto;background-color:#151D30;border:1px solid #26334D;border-radius:20px;padding:32px;text-align:center;">
          <div style="font-size:26px;font-weight:bold;color:#F8FAFC;margin-bottom:6px;">Sleepfy</div>
          <div style="font-size:13px;color:#94A3B8;margin-bottom:24px;">Tu guía hacia el descanso profundo</div>
          <h2 style="color:#A78BFA;font-size:20px;margin:0 0 16px 0;">${params.title}</h2>
          <p style="font-size:15px;color:#F8FAFC;text-align:left;margin:0 0 10px 0;"><strong>${params.greeting}</strong></p>
          <p style="font-size:14px;color:#CBD5E1;line-height:1.6;text-align:left;margin:0 0 24px 0;">${params.body}</p>
          <div style="background-color:#0B101E;border:1px solid #6366F1;border-radius:14px;padding:18px;margin:0 0 24px 0;">
            <span style="font-size:32px;font-weight:bold;letter-spacing:8px;color:#A78BFA;">${params.code}</span>
          </div>
          <p style="font-size:12px;color:#94A3B8;line-height:1.5;margin:0;">${params.footer}</p>
        </div>
      </div>
    `;
  }
}


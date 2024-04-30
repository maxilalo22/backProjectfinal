import nodemailer from 'nodemailer'
import { JWT_PRIVATE_KEY } from '../../config/config.js'
import jwt from "jsonwebtoken"

export class EmailServiceNodemailer {
    constructor(options) {
        this.emailService = this.emailService
        this.origin = options.auth.email
        this.transporter = nodemailer.createTransport(options)
    }

    async enviar({ to, subject, html }) {
        await this.transporter.sendMail({
            from: this.origin,
            to,
            subject,
            html
        })
    }

    async enviarCorreoDeRestablecimiento(email) {
        const token = jwt.sign({ email },  JWT_PRIVATE_KEY, { expiresIn: '1h' });
        const resetPasswordURL = `http://localhost:8080/api/usuarios/reset-password?token=${token}`;
        try {
            const correo = {
                from: this.origin,
                to: email,
                subject: 'Restablecimiento de contraseña',
                html: `¡Hola!<br/><br/>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.<br/>
                        Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:<br/><br/>
                        <a href="${resetPasswordURL}">Restablecer contraseña</a><br/><br/>
                        Si no solicitaste restablecer tu contraseña, puedes ignorar este mensaje.<br/><br/>
                        ¡Gracias!`
            };
            

            await this.transporter.sendMail(correo);

        } catch (error) {
            console.error('Error al enviar el correo de restablecimiento:', error);
            throw new Error('No se pudo enviar el correo de restablecimiento de contraseña');
        }
    }
}
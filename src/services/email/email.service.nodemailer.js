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

    async enviarCorreoDeRestablecimiento(email) {// Define el host como localhost:8080
        const token = jwt.sign({ email },  JWT_PRIVATE_KEY, { expiresIn: '1h' });

        // Construir la URL de restablecimiento de contraseña con el token generado
        const resetPasswordURL = `http://localhost:8080/api/usuarios/reset-password?token=${token}`;
        try {
            // Cuerpo del correo
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
            

            // Lógica para enviar el correo electrónico
            await this.transporter.sendMail(correo);

            console.log('Correo de restablecimiento enviado a:', email);
        } catch (error) {
            // Manejar errores de envío de correo
            console.error('Error al enviar el correo de restablecimiento:', error);
            throw new Error('No se pudo enviar el correo de restablecimiento de contraseña');
        }
    }
}
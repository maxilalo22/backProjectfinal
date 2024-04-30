import { MODO_EJECUCION, NODEMAILER_GMAIL_OPTIONS } from '../../config/config.js'
import { EmailServiceConsola } from './email.service.consola.js'
import { EmailServiceNodemailer } from './email.service.nodemailer.js'

let emailService

// @ts-ignore
if (MODO_EJECUCION === 'online') {
    if (!emailService) {
        emailService = new EmailServiceNodemailer(NODEMAILER_GMAIL_OPTIONS)
    }
} else {
    emailService = new EmailServiceConsola()
}

export function getEmailService() {
    return emailService
} 
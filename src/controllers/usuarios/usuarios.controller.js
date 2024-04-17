import { emailService, usuariosService } from "../../services/index.js"
import { encriptar, generarTokenDeRestablecimiento } from "../../daos/utils/encript.js"

// registrar
export async function postController(req, res, next) {
    try {
        const { nombre, email, password, role } = req.body;
        const encryptedPassword = await encriptar(password); // Encripta la contraseña
        const usuarioPojo = { nombre, email, password: encryptedPassword, role }; // Crea un objeto usuarioPojo
        const usuario = await usuariosService.registrar(usuarioPojo); // Registra el usuario con el servicio
        res.status(201).json(usuario);
        console.log('Usuario creado:', usuario);
    } catch (error) {
        next(error);
    }
}



// dar de baja
export async function deleteController(req, res, next) {
    try {
        await usuariosService.darDeBaja(req.params.id)
        res.deleted()
    } catch (error) {
        next(error)
    }
}

/* export async function resetPasswordController(req, res, next) {
    try {
        const { email, newPassword } = req.body;
        const encryptedPassword = await encriptar(newPassword);
        req.user = await usuariosService.resetPassword({ email, newPassword: encryptedPassword });
        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        next(error);
    }
} */


// En el controlador resetPasswordController



export async function resetPasswordController(req, res, next) {
    try {
        const { email } = req.body;

        // Verificar si se recibió correctamente el email
        if (!email) {
            return res.status(400).json({ message: 'Email no proporcionado' });
        }

        // Generar un token de restablecimiento de contraseña
        const token = generarTokenDeRestablecimiento(email);

        // Llamar al servicio de correo electrónico para enviar el correo de restablecimiento
        await emailService.enviarCorreoDeRestablecimiento(email, token);

        res.status(200).json({ message: 'Correo de restablecimiento de contraseña enviado' });
    } catch (error) {
        next(error);
    }
}



export async function changePasswordController(req, res, next) {
    try {
        const { email, newPassword } = req.body;
        const encryptedPassword = await encriptar(newPassword);
        req.user = await usuariosService.resetPassword({ email, newPassword: encryptedPassword });
        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        next(error);
    }
}


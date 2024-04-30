import { emailService, usuariosService } from "../../services/index.js"
import { encriptar, generarTokenDeRestablecimiento } from "../../daos/utils/encript.js"

// registrar
export async function postController(req, res, next) {
    try {
        const { nombre, email, password, role } = req.body;
        const encryptedPassword = await encriptar(password); 
        const usuarioPojo = { nombre, email, password: encryptedPassword, role };
        const usuario = await usuariosService.registrar(usuarioPojo); 
        res.status(201).json(usuario);
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
export async function updateUserRoleController(req, res, next) {
    try {
        const { usuario, rolNuevo } = req.body;
        await usuariosService.updateRole({ usuario, newRole: rolNuevo });
        res.status(200).json({ message: 'Rol actualizado correctamente! '});
    } catch (error) {
        console.log(error); // Imprime el error en la consola para depuración
        next(error); // Pasa el error al siguiente middleware de manejo de errores
    }
}



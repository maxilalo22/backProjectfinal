import { usuariosService } from "../../services/index.js"
import { encriptar } from "../../daos/utils/encript.js"

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

export async function resetPasswordController(req, res, next) {
    try {
        req.user = await usuariosService.resetPassword(req.body)
        next()
    } catch (error) {
        next(error)
    }
}
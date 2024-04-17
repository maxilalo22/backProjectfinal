import { Router } from 'express'
import { changePasswordController, deleteController, postController, resetPasswordController } from '../../controllers/usuarios/usuarios.controller.js'
import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '../../config/config.js';


export const usuariosRouter = Router()

usuariosRouter.get('/reset-password', async (req, res, next) => {
    try {
        const token = req.query.token; // Obtener el token de la URL

        // Verificar si se recibió correctamente el token
        if (!token) {
            return res.status(400).json({ message: 'Token no proporcionado' });
        }

        // Verificar y decodificar el token
        jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
            if (err) {
                // Si el token no es válido, redirigir a una página de error o mostrar un mensaje al usuario
                return res.status(400).json({ message: 'Token no válido' });
            }

            // Si el token es válido, renderizar la vista change-pass.handlebars
            res.render('changepass', { token });
        });
    } catch (error) {
        next(error);
    }
});

usuariosRouter.post('/', postController)
usuariosRouter.delete('/:id', deleteController)

usuariosRouter.patch('/resetpassword', resetPasswordController)
usuariosRouter.patch('/changepassword', changePasswordController)

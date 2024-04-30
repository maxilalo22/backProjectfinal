import { Router } from 'express'
import { changePasswordController, deleteController, postController, resetPasswordController, updateUserRoleController } from '../../controllers/usuarios/usuarios.controller.js'
import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '../../config/config.js';


export const usuariosRouter = Router()

usuariosRouter.get('/reset-password', async (req, res, next) => {
    try {
        const token = req.query.token; 

        if (!token) {
            return res.status(400).json({ message: 'Token no proporcionado' });
        }

        jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Token no válido' });
            }
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
usuariosRouter.post('/updateRole', updateUserRoleController)

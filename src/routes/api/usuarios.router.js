import { Router } from 'express'
import { deleteController, postController, resetPasswordController } from '../../controllers/usuarios/usuarios.controller.js'

export const usuariosRouter = Router()

usuariosRouter.post('/', postController)
usuariosRouter.delete('/:id', deleteController)

usuariosRouter.patch('/resetpassword', resetPasswordController)

import { Router } from 'express'
import { deleteController, postController, postEnviarController } from '../../controllers/newsletters/newsletters.controler.js'

export const newslettersRouter = Router()

newslettersRouter.post('/', postController)
newslettersRouter.delete('/', deleteController)

newslettersRouter.post('/enviar', postEnviarController)





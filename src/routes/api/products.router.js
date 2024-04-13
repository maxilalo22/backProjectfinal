import { Router } from 'express'
import { deleteController, getController, getProductDetails, postController, putController } from '../../controllers/productos/product.controller.js'
import { currentAdminMiddleware } from '../../middlewares/authorization.js'

export const productsRouter = Router()

productsRouter.get('/', getController)
productsRouter.get('/:id', getProductDetails)
productsRouter.post('/', currentAdminMiddleware, postController)
productsRouter.put('/:pId', currentAdminMiddleware, putController);
productsRouter.delete('/:pId', currentAdminMiddleware, deleteController);

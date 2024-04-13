import { Router, json, urlencoded } from 'express'
import { manejoDeErrores } from '../../middlewares/manejoDeErrores.js'
import { respuestasMejoradas } from '../../middlewares/respuestasMejoradas.js'
import { productsRouter } from './products.router.js'
import {usuariosRouter} from './usuarios.router.js'
import { tiendasRouter } from './tiendas.router.js'
import { newslettersRouter } from './newsletters.router.js'
import { cartsRouter } from './carts.router.js'
import { sesionesRouter } from './sesiones.router.js'


export const apiRouter = Router()

apiRouter.use(respuestasMejoradas)

apiRouter.use(json())
apiRouter.use(urlencoded({ extended: true }))

apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', cartsRouter);
apiRouter.use('/usuarios', usuariosRouter)
apiRouter.use('/tiendas', tiendasRouter)
apiRouter.use('/newsletters', newslettersRouter)
apiRouter.use('/sesiones', sesionesRouter);


apiRouter.use(manejoDeErrores)
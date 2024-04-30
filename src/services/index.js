import { getDaoTiendas } from '../daos/tiendas/tiendas.dao.js'
import { NewslettersService } from './newsletters.services.js'
import { productService } from './product.services.js'
import { TiendasService } from './tiendas.services.js'
import { getEmailService } from './email/email.service.js'
import {getDaoSuscriptores} from '../daos/suscriptores/suscriptores.dao.js'
import {getSmsService} from './sms/sms.service.js'
import {UsuariosService} from './usuarios.services.js'
import { getDaoProductos } from '../daos/productos/products.dao.js'
import { getDaoUsuarios } from '../daos/usuarios/usuarios.dao.js'
import { getDaoOrders } from '../daos/orders/order.dao.js'
import { getDaoCarts } from '../daos/carts/carts.dao.js'

const tiendasDao = getDaoTiendas()
export const emailService = getEmailService()
export const tiendasService = new TiendasService(tiendasDao, productService)

const suscriptoresDao = getDaoSuscriptores()
export const newslettersService = new NewslettersService({ suscriptoresDao, emailService })

const smsService = getSmsService()
const usuariosDao = getDaoUsuarios()
const productosDao = getDaoProductos()
const cartsDao = getDaoCarts()

export const ordersDao = getDaoOrders()
export const usuariosService = new UsuariosService({smsService, usuariosDao, productosDao })
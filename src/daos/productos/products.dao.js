import { model } from 'mongoose'
import { MODO_EJECUCION } from '../../config/config.js'
import { ProductsDaoMongoose } from './mongoose/products.dao.mongoose.js'
import { ProductosDaoFiles } from './file/products.dao.files.js'
import { productsSchema } from './mongoose/products.model.mongoose.js'


const RUTA_USUARIOS_JSON = './db/productos.json'

let daoProductos

if (MODO_EJECUCION === 'online') {
    if (!daoProductos) {
        const productosModel = model('productos', productsSchema)
        daoProductos = new ProductsDaoMongoose(productosModel)
    }
} else {
    daoProductos = new ProductosDaoFiles(RUTA_USUARIOS_JSON)
}

export function getDaoProductos() {
    return daoProductos
} 
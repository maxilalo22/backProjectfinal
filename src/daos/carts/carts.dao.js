import { model } from 'mongoose';
import { MODO_EJECUCION } from '../../config/config.js';
import { CartsDaoMongoose } from './mongoose/cart.dao.mongoose.js';
import { CartsDaoFiles } from './file/carts.dao.files.js';
import cartSchema from './mongoose/cart.model.mongoose.js';

const RUTA_USUARIOS_JSON = './db/carts.json';

let daoCarts;

if (MODO_EJECUCION === 'online') {
    if (!daoCarts) {
        const cartsModel = model('carts', cartSchema)
        daoCarts = new CartsDaoMongoose(cartsModel);
    }
} else {
    daoCarts = new CartsDaoFiles(RUTA_USUARIOS_JSON);
}

export function getDaoCarts() {
    return daoCarts;
}

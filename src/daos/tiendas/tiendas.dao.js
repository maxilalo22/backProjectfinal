import { model } from 'mongoose'
import { MODO_EJECUCION } from '../../config/config.js'

import { TiendasDaoMongoose } from './mongoose/tiendas.dao.mongoose.js'
import { tiendasSchema } from './mongoose/tiendas.model.mongoose.js'
import { TiendasDaoFiles } from './file/tiendas.dao.file.js'

const RUTA_TIENDAS_JSON = './db/tiendas.json'

let daoTiendas

if (MODO_EJECUCION === 'online') {
    if (!daoTiendas) {
        const tiendasModel = model('tiendas', tiendasSchema)
        daoTiendas = new TiendasDaoMongoose(tiendasModel)
        console.log('persistiendo tiendas en: mongodb')
    }
} else {
    daoTiendas = new TiendasDaoFiles(RUTA_TIENDAS_JSON)
    console.log('persistiendo tiendas en: sistema de archivos')
}

export function getDaoTiendas() {
    return daoTiendas
} 
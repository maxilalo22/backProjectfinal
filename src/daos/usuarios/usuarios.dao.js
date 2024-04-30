import { model } from 'mongoose'
import { MODO_EJECUCION } from '../../config/config.js'

import { UsuariosDaoMongoose } from './mongoose/usuarios.dao.mongoose.js'
import { UsuariosDaoFiles } from './file/usuarios.dao.files.js'
import { usuariosSchema } from './mongoose/usuarios.model.mongoose.js'

const RUTA_USUARIOS_JSON = './db/usuarios.json'

let daoUsuarios

if (MODO_EJECUCION === 'online') {
    if (!daoUsuarios) {
        const usuariosModel = model('usuarios', usuariosSchema)
        daoUsuarios = new UsuariosDaoMongoose(usuariosModel)
    }
} else {
    daoUsuarios = new UsuariosDaoFiles(RUTA_USUARIOS_JSON)
}

export function getDaoUsuarios() {
    return daoUsuarios
} 
export default daoUsuarios;
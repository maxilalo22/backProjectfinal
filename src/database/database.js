import { connect as connectToMongoose } from 'mongoose'
import { MODO_EJECUCION, MONGODB_CNX_STR } from '../config/config.js'

export async function connect() {
    if (MODO_EJECUCION === 'online') {
        await connectToMongoose(MONGODB_CNX_STR)
    } else {
    }
}
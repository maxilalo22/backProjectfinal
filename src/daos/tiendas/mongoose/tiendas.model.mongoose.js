import { Schema } from 'mongoose'
import { randomUUID } from 'node:crypto'

export const tiendasSchema = new Schema({
    _id: { type: String, default: randomUUID },
    nombre: { type: String, required: true },
    productos: [String],

}, {
    strict: 'throw',
    versionKey: false
})
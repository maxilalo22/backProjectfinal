
import { Schema } from 'mongoose';
import {randomUUID} from  "crypto";
import cartSchema from '../../carts/mongoose/cart.model.mongoose.js';

const collName = 'users';

export const usuariosSchema = new Schema({
    _id: { type: String, default: randomUUID },
    nombre: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['user', 'premium', 'admin'], default: 'user'},
    cart: {type: cartSchema}
}, {
    strict: 'throw',
    versionKey: false
});


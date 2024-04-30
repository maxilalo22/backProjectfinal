import { model } from 'mongoose'
import { MODO_EJECUCION } from '../../config/config.js';
import { OrdersDaoFiles } from './file/order.dao.files.js'; 
import { OrdersDaoMongoose } from './mongoose/order.dao.mongoose.js';
import orderSchema from './mongoose/order.model.mongoose.js';

const RUTA_ORDERS_JSON = './db/orders.json'; 

let daoOrders; 

if (MODO_EJECUCION === 'online') {
    if (!daoOrders) {
        const ordersModel = model('Orders',orderSchema); 
        daoOrders = new OrdersDaoMongoose(ordersModel); 
    }
} else {
    daoOrders = new OrdersDaoFiles(RUTA_ORDERS_JSON); 
}


export function getDaoOrders() {
    return daoOrders;
}

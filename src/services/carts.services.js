import { getDaoCarts } from '../daos/carts/carts.dao.js';
import { errorMan } from "../daos/utils/errorMan.js";
import daoUsuarios from '../daos/usuarios/usuarios.dao.js';
import { toPOJO } from '../daos/utils/utils.js';

class CartsService {
    constructor() {
        this.cartDao = getDaoCarts(); 
    }

    async readMany() {
        try {
            return await this.cartDao.readMany();
        } catch (error) {
            throw new Error(`Error en CartsService.readMany: ${error}`);
        }
    }

    async readOne(id) {
        try {
            if (!id) {
                const error = new Error("El ID es requerido");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }

            const cart = await this.cartDao.readOne(id);
            if (!cart) {
                const error = new Error(
                    `No se encontró ningún carrito con el ID ${id}`
                );
                error.code = errorMan.NOT_FOUND;
                throw error;
            }
            return cart;
        } catch (error) {
            throw new Error(`Error en CartsService.readOne: ${error}`);
        }
    }


async createOne() {

    try {
        const createdCart = await this.cartDao.createOne();
        if (!createdCart) {
            const error = new Error("No se pudo crear el carrito");
            error.code = errorMan.UNEXPECTED_ERROR;
            throw error;
        }
        return createdCart;
    } catch (error) {
        throw new Error(`Error en CartsService.createOne: ${error}`);
    }
}

    async addProductToCart(req, cartId, productId, quantity) {
        try {
            if (!req || !cartId || !productId || !quantity || isNaN(quantity)) {
                const error = new Error("Se requieren req, cartId, productId y quantity válidos.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
            return await this.cartDao.updateOne(req, productId, quantity);
        } catch (error) {
            throw new Error(`Error en CartsService.addProductToCart: ${error}`);
        }
    }
    
    async deleteProductFromCart(req,id, pid) {
        try {
            if (!req || !id || !pid) {
                const error = new Error("Se requieren req, cartId y productId.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
            return await this.cartDao.deleteProductFromCart(req, id, pid);
        } catch (error) {
            throw new Error(`Error en CartsService.deleteProductFromCart: ${error}`);
        }
    }

    async deleteProductsFromCart(user) {
        try {
            if (!user) {
                const error = new Error("Se requiere un usuario.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
            user.cart._productos = []
            await daoUsuarios.updateOne({ _id: user._id }, { cart: user.cart });
            return toPOJO(user.cart);
        } catch (error) {
            throw new Error(`Error en CartsService.deleteProductsFromCart: ${error}`);
        }
    }
    

    async deleteCart(cartId) {
        try {
            if (!cartId) {
                const error = new Error("Se requiere un cartId.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
            return await this.cartDao.deleteCart(cartId);
        } catch (error) {
            throw new Error(`Error en CartsService.deleteCart: ${error}`);
        }
    }

    async updateIdCart(oldCartId, newCartId) {
        try {
            const updatedCart = await this.cartDao.updateIdCart(oldCartId, newCartId);
            return updatedCart;
        } catch (error) {
            throw new Error(`Error en CartService.updateIdCart: ${error.message}`);
        }
    }

    async updateLastCartWithUserId(oldCartId, newCartId) {
        try {
            const lastCart = await this.cartDao.getLastCart();
            console.log("Serv LasCart", lastCart)
            if (!lastCart) {
                throw new Error("No se encontró ningún carrito en la base de datos.");
            }
            if (lastCart._id === oldCartId) {
                lastCart._id = newCartId;
                console.log(newCartId)
                await this.cartDao.updateIdCart(oldCartId, newCartId);
            }

            return lastCart;
        } catch (error) {
            throw new Error(`Error en CartService.updateLastCartWithUserId: ${error.message}`);
        }
    }
}

export const cartsService = new CartsService();

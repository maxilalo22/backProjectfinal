import { getDaoCarts } from '../daos/carts/carts.dao.js';
import { CartModel } from "../models/cart.model.js";
import { errorMan } from "../daos/utils/errorMan.js";

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

    
    /* async createOne(userId) {
        try {
            const newCartData = {
                userId: userId, // Asignar el ID del usuario al campo userId del carrito
                // Otros datos del carrito si los hay
            };

            const newCart = await this.cartDao.createOne(newCartData);
            return newCart;
        } catch (error) {
            throw new Error(`Error en CartsService.createOne: ${error.message}`);
        }
    } */

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
    
/*     async addProductToCartController(req, res, next) {
        try {
            let cartId = req.session.cartId;
            let productId = req.body.productId || req.params.id;
            let quantity = req.body.quantity || req.params.quantity || 1;
    
            if (!cartId || !productId || isNaN(quantity)) {
                const error = new Error("Se requieren cartId, productId y quantity.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
    
            let cart = await cartsService.getCartById(cartId);
    
            if (!cart) {
                const userId = req.session.passport.user;
                cart = await cartsService.createOne(userId);
            }
    
            const updatedCart = await cartsService.addProductToCart(cartId, productId, quantity);
            res.json(updatedCart);
        } catch (error) {
            next(error);
        }
    } */
    
    async deleteProductFromCart(cartId, productId) {
        try {
            if (!cartId || !productId) {
                const error = new Error("Se requieren cartId y productId.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
            return await this.cartDao.deleteProductFromCart(cartId, productId);
        } catch (error) {
            throw new Error(`Error en CartsService.deleteProductFromCart: ${error}`);
        }
    }

    async deleteProductsFromCart(cartId) {
        try {
            if (!cartId) {
                const error = new Error("Se requiere un cartId.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
            return await this.cartDao.deleteProductsFromCart(cartId);
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
}

export const cartsService = new CartsService();

import { cartsService } from "../../services/carts.services.js"
import { errorMan } from "../../daos/utils/errorMan.js"
import daoUsuarios from "../../daos/usuarios/usuarios.dao.js";

export async function getCartsController(req, res, next) {
    try {
        const carts = await cartsService.readMany();
        if (!carts.length) {
            const error = new Error("No se encontraron carritos.");
            error.code = errorMan.NOT_FOUND;
            throw error;
        }

        res.json(carts);
    } catch (error) {
        next(error);
    }
}

export async function getCartController(req, res, next) {
    try {
        let cartId = null;
        let cart = null
        if (req.user) {
            cartId = req.user.cart._id;
            cart = req.user.cart
        } else {
            cartId = req.params.id;
        }
        res.json({ cart });
    } catch (error) {
        console.error('Error in getCartController:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}


export async function postCartController(req, res, next) {
    try {
        const userId = req.session.passport.user;
        const cartId = req.session.cartId
        const newCart = await cartsService.createOne(userId, cartId);
        if (!newCart) {
            const error = new Error("No se pudo crear el carrito");
            error.code = errorMan.UNEXPECTED_ERROR;
            throw error;
        }

        res.status(201).json(newCart);
    } catch (error) {
        next(error);
    }
}




export async function addProductToCartController(req, res, next) {
    try {
        const { id, pid } = req.params;
        const { quantity = 1 } = req.body;

        const updatedCart = await cartsService.addProductToCart(req, id, pid, quantity);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
}

export async function updateProductCartController(req, res, next) {
    try {
        const { id, pid } = req.params;
        const { quantity } = req.body;
        const cart = req.user.cart
        const updatedCart = await cartsService.addProductToCart(req,cart, pid, quantity);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
}


export async function deleteProductFromCartController(req, res, next) {
    try {
        const { id, pid } = req.params;
        const cart = req.user.cart

        const updatedCart = await cartsService.deleteProductFromCart(req,cart, pid);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
}

export async function deleteProductsFromCartController(req, res, next) {
    try {
        const { id } = req.params;
        const usuarios = await daoUsuarios.findByCartId(id);
        if (!usuarios || usuarios.length === 0) {
            const error = new Error("No se encontraron usuarios con el carrito proporcionado.");
            error.code = errorMan.NOT_FOUND;
            throw error;
        }
        const usuario = usuarios[0];
        const updatedCart = await cartsService.deleteProductsFromCart(usuario);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
}


export async function deleteCartController(req, res, next) {
    try {
        const { id } = req.params;
        const deletedCart = await cartsService.deleteCart(id);
        res.json(deletedCart);
    } catch (error) {
        next(error);
    }
}


export async function updateCurrentCartController(req, res, next) {
    try {
        let cart = null;
        if (req.user && req.user.cart) {
            cart = req.user.cart;
            console.log("Controler", cart._id);
        } else {
            return res.status(404).json({ message: 'El carrito del usuario no existe' });
        }

        const { pid } = req.params;
        const { quantity: newQuantity } = req.body;
        console.log(pid, newQuantity);

        const updatedCart = await cartsService.addProductToCart(req, cart._id, pid, newQuantity);

        res.json({ message: 'Cantidad de producto actualizada correctamente en el carrito' });
    } catch (error) {
        next(error);
    }
}



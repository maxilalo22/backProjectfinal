import { cartsService } from "../../services/carts.services.js"
import { errorMan } from "../../daos/utils/errorMan.js"

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
        const { id } = req.params;
        if (!id) {
            const error = new Error("El ID es requerido");
            error.code = errorMan.INCORRECT_DATA;
            throw error;
        }

        const cart = await cartsService.readOne(id);
        if (!cart) {
            const error = new Error(`No se encontró ningún carrito con el ID ${id}`);
            error.code = errorMan.NOT_FOUND;
            throw error;
        }

        res.json(cart);
    } catch (error) {
        next(error);
    }
}

export async function postCartController(req, res, next) {
    try {
        const userId = req.session.passport.user;
        const cartId = req.session.cartId 
        const newCart = await cartsService.createOne(userId,cartId);
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
        
        const updatedCart = await cartsService.addProductToCart(req,id, pid, quantity);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
}

export async function updateProductCartController(req, res, next) {
    try {
        const { id, pid } = req.params;
        const { quantity } = req.body;

        const updatedCart = await cartsService.addProductToCart(id, pid, quantity);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
}

export async function deleteProductFromCartController(req, res, next) {
    try {
        const { id, pid } = req.params;

        const updatedCart = await cartsService.deleteProductFromCart(id, pid);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
}

export async function deleteProductsFromCartController(req, res, next) {
    try {
        const { id } = req.params;

        const updatedCart = await cartsService.deleteProductsFromCart(id);
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
    



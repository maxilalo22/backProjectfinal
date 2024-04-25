import { errorMan } from "../../../daos/utils/errorMan.js";
import daoUsuarios from "../../usuarios/usuarios.dao.js";
import { toPOJO } from "../../utils/utils.js";

export class CartsDaoMongoose {
    constructor(cartsModel, usuariosModel) {
        this.cartsModel = cartsModel;
    }

    async readMany() {
        try {
            const carts = await this.cartsModel.find().lean();
            return toPOJO(carts);
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.readMany: ${error.message}`);
        }
    }

    async readOne(id) {
        try {
            const cart = await this.cartsModel.findById(id).lean();
            return toPOJO(cart);
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.readOne: ${error.message}`);
        }
    }

    async createOne(newCartData) {
        try {
            const cart = await this.cartsModel.create(newCartData);
            return toPOJO(cart);
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.createOne: ${error.message}`);
        }
    }

    async updateOne(req, productId, quantity) {
        try {
            if (!req || !req.user || !req.user._id || !productId || !quantity || isNaN(quantity)) {
                const error = new Error("Se requieren req, productId y quantity válidos.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
    
            const userId = req.user._id;
            const usuario = await daoUsuarios.findById(userId);
    
            if (!usuario) {
                const error = new Error("Usuario no encontrado");
                error.code = errorMan.NOT_FOUND;
                throw error;
            }
    
            // Obtener el carrito del usuario
            const cart = usuario.cart;
    
            // Verificar si el producto ya existe en el carrito
            const existingProduct = cart._productos.find(product => product._id === productId);
    
            if (existingProduct) {
                existingProduct.quantity += parseInt(quantity);
                if (existingProduct.quantity <= 0) {
                    // Si la cantidad es cero o menor, eliminar el producto del carrito
                    cart._productos = cart._productos.filter(product => product._id !== productId);
                }
            } else {
                // Si el producto no está en el carrito, agregarlo
                if (parseInt(quantity) > 0) {
                    cart._productos.push({ _id: productId, quantity: parseInt(quantity) });
                }
            }
    


        await daoUsuarios.updateOne({ _id: userId }, usuario);

        return usuario.cart;
    
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.updateOne: ${error.message}`);
        }
    }
    
    
    
    

    async deleteProductFromCart(cartId, productId) {
        try {
            if (!cartId || !productId) {
                const error = new Error("Se requieren cartId y productId.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }

            const cart = await this.cartModel.findById(cartId);

            if (!cart) {
                const error = new Error("Carrito no encontrado");
                error.code = errorMan.NOT_FOUND;
                throw error;
            }

            cart._productos = cart._productos.filter(
                (product) => product._id !== productId
            );

            await cart.save();

            return toPOJO(cart);
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.deleteProductFromCart: ${error.message}`);
        }
    }

    async deleteProductsFromCart(cartId) {
        try {
            if (!cartId) {
                const error = new Error("Se requiere un cartId.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }

            const cart = await this.cartModel.findById(cartId);

            if (!cart) {
                const error = new Error("Carrito no encontrado");
                error.code = errorMan.NOT_FOUND;
                throw error;
            }

            cart.productos = [];

            await cart.save();

            return toPOJO(cart);
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.deleteProductsFromCart: ${error.message}`);
        }
    }
    async deleteCart(cartId) {
        try {
            if (!cartId) {
                const error = new Error("Se requiere un cartId.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
    
            const result = await this.cartModel.findByIdAndDelete(cartId);
    
            if (!result) {
                const error = new Error("No se encontró el carrito a eliminar.");
                error.code = errorMan.NOT_FOUND;
                throw error;
            }
            return { message: "Carrito eliminado correctamente." };
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.deleteCart: ${error.message}`);
        }
    }
    
}

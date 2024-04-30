import { errorMan } from "../../../daos/utils/errorMan.js";
import daoUsuarios from "../../usuarios/usuarios.dao.js";
import { toPOJO } from "../../utils/utils.js";

export class CartsDaoMongoose {
    constructor(cartsModel) {
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
            const cart = await this.cartsModel.findOne(id).lean();
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
    async updateIdCart(oldCartId, newCartId) {
        try {
            await this.cartsModel.deleteOne({ _id: oldCartId });
            const newCart = await this.cartsModel.create({ _id: newCartId })
            return newCart;
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.updateIdCart: ${error.message}`);
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

            const cart = usuario.cart;
            const existingProduct = cart._productos.find(product => product._id === productId);

            if (existingProduct) {
                existingProduct.quantity = parseInt(quantity);
                if (existingProduct.quantity <= 0) {
                    cart._productos = cart._productos.filter(product => product._id !== productId);
                }
            } else {
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





    async deleteProductFromCart(req, cartId, productId) {
        try {
            if (!cartId || !productId) {
                const error = new Error("Se requieren cartId y productId.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }
            const userId = req.user._id;
            const usuario = await daoUsuarios.findById(userId);
            const cart = req.user.cart

            if (!cart) {
                const error = new Error("Carrito no encontrado");
                error.code = errorMan.NOT_FOUND;
                throw error;
            }

            const productIndex = cart._productos.findIndex(product => product._id === productId);
            if (productIndex === -1) {
                const error = new Error("Producto no encontrado en el carrito");
                error.code = errorMan.NOT_FOUND;
                throw error;
            }

            // Eliminar el producto del carrito
            cart._productos.splice(productIndex, 1);

            await daoUsuarios.updateOne({ _id: userId }, { cart: cart });

            return toPOJO(cart);
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.deleteProductFromCart: ${error.message}`);
        }
    }

    async deleteProductsFromCart(user) {
        try {
            if (!user) {
                const error = new Error("Se requiere un user.");
                error.code = errorMan.INCORRECT_DATA;
                throw error;
            }

            cart._productos = [];

            await daoUsuarios.updateOne({ user: user }, { cart: cart });

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

            const result = await this.cartsModel.findByIdAndDelete(cartId);

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

    async getLastCart() {
        try {
            // Obtener el último carrito creado en la base de datos ordenando por fecha de creación descendente y limitando a 1 resultado
            const lastCart = await this.cartsModel.findOne().sort({ createdAt: -1 }).limit(1).lean();

            return lastCart;
        } catch (error) {
            throw new Error(`Error en CartsDaoMongoose.getLastCart: ${error.message}`);
        }
    }

}

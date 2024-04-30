import { cartsService } from "../../services/carts.services.js";
import { productService } from "../../services/product.services.js";
import { ordersService } from "../../services/orders.services.js";
import { errorMan } from "../../daos/utils/errorMan.js";
import { usuariosService } from "../../services/index.js";


export async function postOrderController(req, res, next) {
    try {
        const cart = req.user.cart
        if (!cart) {
            throw new Error(errorMan.NOT_FOUND.message);
        }
        const userId = req.user._id
        const user = await usuariosService.obtenerUsuarioPorId(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const purchaser = `${user.nombre}, email: ${user.email}`;
        
        let amount = 0;
        const productsWithoutStock = [];
        for (const product of cart._productos) {
            const { _id, title, quantity } = product;
            const productInfo = await productService.obtenerProductoPorId(_id);

            if (!productInfo || productInfo.stock < quantity) {
                productsWithoutStock.push({
                    product: _id,
                    stock: productInfo ? productInfo.stock : 0,
                });
            } else {
                productInfo.stock -= quantity;
                await productService.actualizarProducto(_id, productInfo);
                amount += productInfo.price * quantity;
            }
        }

        if (productsWithoutStock.length > 0) {
            const error = new Error(errorMan.UNPROCESSABLE_ENTITY.message);
            error.products = productsWithoutStock;
            throw error;
        }

        const newOrder = await ordersService.createOne({
            purchaser,
            amount,
            products: cart._productos
        });
        
        await cartsService.deleteProductsFromCart(user);
        res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
}


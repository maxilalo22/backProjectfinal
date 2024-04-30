import { Router } from "express";
import { addProductToCartController, deleteProductFromCartController, deleteProductsFromCartController, getCartController, updateCurrentCartController, updateProductCartController } from "../../controllers/carts/cart.controller.js";
import { currentAdminMiddleware, currentUserMiddleware } from "../../middlewares/authorization.js";
import { postOrderController } from "../../controllers/orders/orders.controllers.js";

export const cartsRouter = Router();




cartsRouter.get("/:id", getCartController);

cartsRouter.post("/:id/product/:pid",currentUserMiddleware, addProductToCartController);

cartsRouter.delete("/:id/product/:pid", currentUserMiddleware, deleteProductFromCartController);

cartsRouter.put("/:id/product/:pid", currentUserMiddleware, updateProductCartController);

cartsRouter.put("/current/:pid", currentUserMiddleware ,updateCurrentCartController)

cartsRouter.delete("/:id", currentAdminMiddleware, deleteProductsFromCartController);

cartsRouter.post("/:cid/purchase", currentUserMiddleware, postOrderController)

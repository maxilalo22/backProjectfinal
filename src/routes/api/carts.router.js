import { Router } from "express";
import { addProductToCartController, deleteCartController, deleteProductFromCartController, getCartController, getCartsController, postCartController, updateProductCartController } from "../../controllers/carts/cart.controller.js";
import { currentAdminMiddleware, currentUserMiddleware } from "../../middlewares/authorization.js";
import { postOrderController } from "../../controllers/orders/orders.controllers.js";



export const cartsRouter = Router();


cartsRouter.get("/", getCartsController);


cartsRouter.get("/:id", getCartController);


cartsRouter.post("/", currentUserMiddleware, postCartController);


cartsRouter.post("/:id/product/:pid",currentUserMiddleware, addProductToCartController);


cartsRouter.delete("/:id/product/:pid", currentUserMiddleware, deleteProductFromCartController);


cartsRouter.put("/:id/product/:pid", currentUserMiddleware, updateProductCartController);


cartsRouter.delete("/:id", currentAdminMiddleware, deleteCartController);

cartsRouter.post("/:cid/purchase", currentUserMiddleware, postOrderController)

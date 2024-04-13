import { productService } from '../../services/product.services.js'

export async function getController(req, res, next) {
    try {
        const productos = await productService.obtenerProductos()
        res.result(productos)
    } catch (error) {
        next(error)
    }
}

export async function getProductDetails(req, res, next) {
    try {
        const productId = req.params.id;
        const product = await productService.obtenerProductoPorId(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.render('productDetails', { product });
    } catch (error) {
        console.log("Error en getProductDetails:", error);
        next(error);
    }
}


export async function postController(req, res, next) {
    try {
        const producto = await productService.agregarProducto(req.body)
        res.created(producto)
    } catch (error) {
        console.log("Error en postController:", error);
        next(error)
    }
}

export async function deleteController(req, res, next) {
    try {
        const productId = req.params.pId;
        const productoEliminado = await productService.eliminarProducto(productId);
        if (!productoEliminado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.send(productoEliminado);
    } catch (error) {
        console.log("Error en deleteController:", error);
        next(error);
    }
}

export async function putController(req, res, next) {
    try {
        const productId = req.params.pId;
        const datosActualizados = req.body;
        const productoActualizado = await productService.actualizarProducto(productId, datosActualizados);
        if (!productoActualizado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.send(productoActualizado);
    } catch (error) {
        console.log("Error en updateController:", error);
        next(error);
    }
}

import { Router } from 'express'
import { productService } from '../../services/product.services.js'
import { getCartController } from '../../controllers/carts/cart.controller.js'
import { auth } from '../../middlewares/authentication.js'

export const webRouter = Router()

webRouter.get('/', async (req, res) => {
    try {
        let cartId = null
        if (req.user) {
            cartId = req.user.cart._id
        }
        const products = await productService.obtenerProductos()
        res.render('home.handlebars', { pageTitle: 'Lista de Productos', products: products, cartId })
    } catch (error) {
        console.error(error)
        res.status(500).send('Error obteniendo productos.')
    }
})

webRouter.get('/cart', async (req, res) => {
    try {
        let cart = null;
        if (req.user && req.user.cart) {
            cart = req.user.cart;
        }
        
        // Obtener los productos del carrito
        const productsInCart = cart._productos;
        
        // Array para almacenar la información completa de cada producto
        const productsInfo = [];

        // Recorrer cada producto en el carrito
        for (const product of productsInCart) {
            // Obtener la información del producto utilizando su ID
            const productInfo = await productService.obtenerProductoPorId(product._id);
            const total = productInfo.price * product.quantity;
            if (productInfo) {
                productsInfo.push({
                    _id: product._id,
                    title: productInfo.title,
                    price: productInfo.price,
                    quantity: product.quantity,
                    total: total
                });
            }
        }
        
        res.render('cart.handlebars', { pageTitle: 'Carrito de Compra', cart: productsInfo });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error obteniendo productos.');
    }
});









// registrar usuario

webRouter.get('/register', (req, res) => {
    res.render('register.handlebars', {
        pageTitle: 'Registro'
    })
})

// modificar usuario

webRouter.get('/resetpassword', (req, res) => {
    res.render('resetpassword.handlebars', {
        pageTitle: 'Reestablecer contraseña'
    })
})

// ver usuario

webRouter.get('/profile',
    (req, res) => {
        res.render('profile.handlebars', {
            pageTitle: 'Perfil',
            user: req.user,
        })
    })

// iniciar sesion

webRouter.get('/login', (req, res) => {
    res.render('login.handlebars', {
        pageTitle: 'Login'
    })
})

webRouter.get('/cart', getCartController, (req, res) => {
    res.render('cart.handlebars', {
        pageTitle: 'Cart'
    })
})

webRouter.get('/edit', (req, res) => {
    //console.log(req.user._id)
    try {
        let role = null;
        let usuarioId = null;
        if (req.user) {
            usuarioId = req.user._id;
            role = req.user.role;
            if (role === "user") role = 'Usuario Común';
        }
        console.log("Web:", usuarioId);
        res.render('edit.handlebars', { pageTitle: 'Editar mis datos', usuarioId, role });
    } catch (error) {
        console.log(error)
    }

})


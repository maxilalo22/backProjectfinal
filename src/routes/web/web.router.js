import { Router } from 'express'
import { productService } from '../../services/product.services.js'
import { ordersDao } from '../../services/index.js'

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
        const productsInCart = cart._productos;
        const productsInfo = [];
        let totalCart = 0; 
        for (const product of productsInCart) {
            const productInfo = await productService.obtenerProductoPorId(product._id);
            const total = productInfo.price * product.quantity;
            totalCart += total; 
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
        
        res.render('cart.handlebars', { pageTitle: 'Carrito de Compra', cart: productsInfo, totalCart: totalCart });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error obteniendo productos.');
    }
});


webRouter.get('/register', (req, res) => {
    res.render('register.handlebars', {
        pageTitle: 'Registro'
    })
})


webRouter.get('/resetpassword', (req, res) => {
    res.render('resetpassword.handlebars', {
        pageTitle: 'Reestablecer contraseña'
    })
})


webRouter.get('/profile',
    (req, res) => {
        res.render('profile.handlebars', {
            pageTitle: 'Perfil',
            user: req.user,
        })
    })


webRouter.get('/login', (req, res) => {
    res.render('login.handlebars', {
        pageTitle: 'Login'
    })
})

webRouter.get('/edit', (req, res) => {
    try {
        let role = null;
        let usuarioId = null;
        if (req.user) {
            usuarioId = req.user._id;
            role = req.user.role;
            if (role === "user") role = 'Usuario Común';
        }
        res.render('edit.handlebars', { pageTitle: 'Editar mis datos', usuarioId, role });
    } catch (error) {
        throw error
    }
})

webRouter.get(`/ticket/:orderId`, async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await ordersDao.readOne(orderId);

        const productsWithDetails = [];

        for (const product of order.products) {
            const productDetails = await productService.obtenerProductoPorId(product._id);
            productsWithDetails.push({
                _id: product._id,
                title: productDetails.title, 
                quantity: product.quantity
            });
        }
        order.products = productsWithDetails;
        res.render('compraFinalizada.handlebars', { order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



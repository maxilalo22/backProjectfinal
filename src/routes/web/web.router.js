import { Router } from 'express'
import { productService } from '../../services/product.services.js'

export const webRouter = Router()

webRouter.get('/', async (req, res) => {
    try {
        const products = await productService.obtenerProductos()
        res.render('home.handlebars', { pageTitle: 'Lista de Productos', products: products })
    } catch (error) {
        // Manejo de errores
        console.error(error)
        res.status(500).send('Error obteniendo productos.')
    }
})

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

webRouter.get('/edit', function (req, res) {
    res.render('edit.handlebars', {
        pageTitle: 'Editar mis datos'
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
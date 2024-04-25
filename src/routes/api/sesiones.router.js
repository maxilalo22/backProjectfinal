/* import { Router } from 'express'
import passport from 'passport'

import { appendJwtAsCookie, removeJwtFromCookies } from '../../src/middlewares/authentication.js'

export const sesionesRouter = Router()

sesionesRouter.post('/',
    passport.authenticate('local-login',
        { failWithError: true, session: false }),
    appendJwtAsCookie,
    async function (req, res) {
        res['creado'](req.user)
    },
)

sesionesRouter.get('/current',
    passport.authenticate('jwt',
        { failWithError: true, session: false }),
    function (req, res) {
        res['ok'](req.user)
    },
)

sesionesRouter.delete('/current',
    removeJwtFromCookies,
    (req, res) => {
        res['ok']({ message: 'logout OK' })
    }
) */

/* import { Router } from 'express';
import passport from 'passport'
import { appendJwtAsCookie, removeJwtFromCookies } from '../../middlewares/authentication.js'

export const sesionesRouter = Router();

sesionesRouter.post('/', passport.authenticate('local-login', { failWithError: true, session: false }), appendJwtAsCookie, async function (req, res) {
    res['creado'](req.user);
});

sesionesRouter.get('/current', passport.authenticate('jwt', { failWithError: true, session: false }), function (req, res) {
    res['ok'](req.user);
});

sesionesRouter.delete('/current', removeJwtFromCookies, (req, res) => {
    res['ok']({ message: 'Logout OK' });
}); */

import { Router } from 'express';
import { auth } from '../../middlewares/authentication.js';
import passport from 'passport';
import { cartsService } from '../../services/carts.services.js';

export const sesionesRouter = Router();

sesionesRouter.get('/', (req, res) => {
    res.send('¡BIENVENIDO!');
});

sesionesRouter.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
    console.log('Usuario autenticado:', req.user);
    if (req.user) {
        console.log(req.user)
        req.session.user = req.user.email;
        req.session.cartId = req.user.cart._id
        req.session.admin = req.user.role === 'admin';
        const usuarioDTO = {
            nombre: req.user.name,
            email: req.user.email,
            cart: req.user.cart._id
        };
        res.send({ status: 'success', payload: usuarioDTO });
    } else {
        res.status(400).send({ status: 'error', error: 'Credenciales inválidas' });
    }
});



sesionesRouter.get('/faillogin', (req, res) => {
    console.log('Intento de inicio de sesión fallido');
    res.status(401).send({ error: 'Intento de inicio de sesión fallido' });
});

sesionesRouter.get('/auth', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ autenticado: true });
    } else {
        res.status(401).json({ autenticado: false });
    }
});


sesionesRouter.get('/privado', auth, (req, res) => {
    res.send('¡Bienvenido Admin!');
});

sesionesRouter.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ status: 'error al cerrar sesión', body: err });
        }
        res.send('Cierre de sesión correcto');
    });
});

sesionesRouter.get('/current', (req, res) => {
    if (req.user) {

        const usuarioDTO = {
            nombre: req.user.nombre,
            email: req.user.email,
            role: req.user.role,
            cartId: req.user.cart._id
        };
        res.send({ status: 'success', payload: usuarioDTO });
    } else {
        res.status(401).send({ status: 'error', error: 'Usuario no autenticado' });
    }
});

sesionesRouter.post('/cartId', (req, res) => {
    const { cartId } = req.body;
    req.session.cartId = cartId;
    res.sendStatus(200);
});
sesionesRouter.get('/cartId', (req, res) => {
    const cartId = req.session.cartId;
    res.json({ cartId });
});





import { Router } from 'express';
import { auth } from '../../middlewares/authentication.js';
import passport from 'passport';


export const sesionesRouter = Router();

sesionesRouter.get('/', (req, res) => {
    res.send('¡BIENVENIDO!');
});

sesionesRouter.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
    if (req.user) {
        req.session.admin = req.user.role === 'admin';
        req.session.user = req.user.email;
        
        const usuarioDTO = {
            nombre: req.user.name,
            email: req.user.email,
        };
        res.send({ status: 'success', payload: usuarioDTO });
    } else {
        res.status(400).send({ status: 'error', error: 'Credenciales inválidas' });
    }
});



sesionesRouter.get('/faillogin', (req, res) => {
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
            id: req.user._id,
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




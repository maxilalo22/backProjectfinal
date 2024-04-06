import passport from 'passport'
import local from 'passport-local'
import { createHash, isValidPassword } from '../daos/utils/utils.js'
import { getDaoUsuarios } from '../daos/usuarios/usuarios.dao.js'

const LocalStrategy = local.Strategy
const usuariosDao = getDaoUsuarios()

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, 
        async (req, username, password, done) => {
            const { name, email } = req.body;
            try {
                let user = await usuariosDao.readOne({ email: username });
                if (user) {
                    console.log('User already exists');
                    return done(null, false);
                }
                const newUser = {
                    name,
                    email,
                    password: createHash(password)
                };
                let result = await usuariosDao.create(newUser);
                return done(null, result);
            } catch (error) {
                return done('Error al obtener el usuario' + error);
            }
        }
    ));
    
    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await usuariosDao.findById(id);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    });
};


passport.use('login', new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    try {
        const user = await usuariosDao.readOne({ email: email });
        if (!user) {
            console.log('Usuario inexistente');
            return done(null, false);
        }
        if (!isValidPassword(user, password)) {
            console.log('Contraseña incorrecta');
            return done(null, false, { message: 'Contraseña incorrecta' });
        }
        
        // Establecer la sesión de usuario
        req.session.user = user.email;

        // Establecer la sesión de administrador si el usuario es un administrador
        req.session.admin = user.role === 'admin';

        console.log(`Inicio de sesión exitoso como ${user.role}`);
        
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

export default initializePassport;


 /* passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await usuariosDao.readOne({ email: username });
            if (!user) {
                console.log('Usuario inexistente');
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                console.log('Contraseña incorrecta');
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })); */


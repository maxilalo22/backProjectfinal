/* import passport from 'passport'
import { UsuariosDaoFiles } from '../daos/usuarios/file/usuarios.dao.files.js'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { JWT_PRIVATE_KEY } from '../config/config.js'
import { encriptar } from '../daos/utils/encript.js'
import { Strategy as LocalStrategy } from 'passport-local'

const COOKIE_OPTS = { signed: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }

export async function appendJwtAsCookie(req, res, next) {
    try {
        const accessToken = await encriptar(req.user)
        res.cookie('authorization', accessToken, COOKIE_OPTS)
        next()
    } catch (error) {
        next(error)
    }
}

export async function removeJwtFromCookies(req, res, next) {
    res.clearCookie('authorization', COOKIE_OPTS)
    next()
}

// JWT Strategy
passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
        let token = null
        if (req?.signedCookies) {
            token = req.signedCookies['authorization']
        }
        return token
    }]),
    secretOrKey: JWT_PRIVATE_KEY,
}, function loginUser(user, done) {
    done(null, user)
}))

// Local Strategy for Registration
passport.use('local-register', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
},
    async (req, email, password, done) => {
        try {
            // Check if the email already exists
            const existingUser = await UsuariosDaoFiles.findByEmail(email)
            if (existingUser) {
                return done(null, false, { message: 'Email already exists' })
            }
            
            // Create a new user with provided details
            const newUser = await UsuariosDaoFiles.create({ email, password })
            done(null, newUser)
        } catch (error) {
            done(null, false, error.message)
        }
    }))

// Local Strategy for Login
passport.use('local-login', new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Find user by email
        const user = await UsuariosDaoFiles.findByEmail(email)
        if (!user) {
            return done(null, false, { message: 'User not found' })
        }

        // Check if password matches
        const isValidPassword = await UsuariosDaoFiles.isValidPassword(password)
        if (!isValidPassword) {
            return done(null, false, { message: 'Incorrect password' })
        }

        done(null, user)
    } catch (error) {
        return done(null, false, error.message)
    }
}))

// Custom Strategy for Password Recovery
passport.use('password-recovery', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    secretOrKey: JWT_PRIVATE_KEY,
    passReqToCallback: true
}, async (req, payload, done) => {
    try {
        const { userId, newPassword } = req.body; // Assuming you pass userId and newPassword in the request body

        // Implement your password recovery logic here
        const user = await UsuariosDaoFiles.findById(userId);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        
        // Update user's password with the new one
        user.password = newPassword;
        await UsuariosDaoFiles.update(user);

        done(null, user);
    } catch (error) {
        done(error);
    }
}));

// Custom Strategy for Role Change
passport.use('role-change', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    secretOrKey: JWT_PRIVATE_KEY,
    passReqToCallback: true
}, async (req, payload, done) => {
    try {
        const { userId, newRole } = req.body; // Assuming you pass userId and newRole in the request body

        // Check if the requesting user is an admin or has appropriate permissions
        if (!req.user.isAdmin) {
            return done(null, false, { message: 'Unauthorized: Only admin can change roles' });
        }

        // Fetch user by userId
        const user = await UsuariosDaoFiles.findById(userId);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }

        // Update user's role
        user.role = newRole;
        await UsuariosDaoFiles.update(user);

        done(null, user);
    } catch (error) {
        done(error);
    }
}));

export const autentication = passport.initialize() */

import { JWT_PRIVATE_KEY } from "../config/config.js";
import { UsuariosDaoMongoose } from "../daos/usuarios/mongoose/usuarios.dao.mongoose.js";




export async function auth(req, res, next) {
    console.log("Verifying authentication...");
    console.log("Is authenticated:", req.isAuthenticated());
    console.log("Session user:", req.session.user);
    console.log("Session admin:", req.session.admin);

    if (req.isAuthenticated() && req.session.admin) {
        
        console.log("Authentication successful!");
        return next();
    }

    console.log("Authentication failed!");
    return res.status(401).send('Unauthorized');
}

/* passport.use('password-recovery', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    secretOrKey: JWT_PRIVATE_KEY,
    passReqToCallback: true
}, async (req, payload, done) => {
    try {
        const { userId, newPassword } = req.body; 
        const user = await UsuariosDaoMongoose.findById(userId);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        user.password = newPassword;
        await UsuariosDaoMongoose.updateOne(user);

        done(null, user);
    } catch (error) {
        done(error);
    }
})); */


import passport from 'passport'



function authorizeRole(roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Prohibido: Acceso denegado' });
        }
        next();
    };
}

export const currentMiddleware = passport.authenticate('login', { session: false });
export const currentAdminMiddleware = authorizeRole(['admin'])
export const currentUserMiddleware = authorizeRole(['user','premium']);







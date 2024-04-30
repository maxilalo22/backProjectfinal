

export async function auth(req, res, next) {
    console.log("Verifying authentication...");
    console.log("Is authenticated:", req.isAuthenticated());
    console.log("Session user:", req.session.user);
    console.log("Session admin:", req.session.admin);

    if (req.isAuthenticated() && req.session.admin) {
        res.redirect('/login');
    }

    return res.status(401).send('Unauthorized');
}

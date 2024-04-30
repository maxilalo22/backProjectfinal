export function manejoDeErrores(error, req, res, next) {
    res.status(400).json({ status: 'error', message: error.message });
}

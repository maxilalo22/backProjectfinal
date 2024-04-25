// services/sesiones.service.js


import { isValidPassword } from '../daos/utils/utils.js'; // Importa la función isValidPassword
import { usuariosService } from './index.js';


export async function authenticateUser({ email, password }) {
    try {
        const user = await usuariosService.obtenerUsuarioPorId(email);
        if (!user) {
            return null; // El usuario no existe
        }

        const isValid = await isValidPassword(user, password); // Comprueba si la contraseña es válida
        if (!isValid) {
            return null; // Contraseña incorrecta
        }

        return user; // Devuelve el usuario autenticado
    } catch (error) {
        console.error('Error durante la autenticación del usuario:', error);
        throw error;
    }
}

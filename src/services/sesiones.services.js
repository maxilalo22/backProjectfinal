
import { isValidPassword } from '../daos/utils/utils.js'; // Importa la función isValidPassword
import { usuariosService } from './index.js';


export async function authenticateUser({ email, password }) {
    try {
        const user = await usuariosService.obtenerUsuarioPorId(email);
        if (!user) {
            return null; 
        }

        const isValid = await isValidPassword(user, password); 
        if (!isValid) {
            return null; 
        }

        return user; 
    } catch (error) {
        console.error('Error durante la autenticación del usuario:', error);
        throw error;
    }
}

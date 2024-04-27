import { encriptar, hasheadasSonIguales, hashear } from '../daos/utils/encript.js';
import { toPOJO } from '../daos/utils/utils.js';
import { Usuario } from '../models/usuarios.model.js';

export class UsuariosService {

    constructor({ smsService, usuariosDao, productosDao }) {
        this.smsService = smsService;
        this.usuariosDao = usuariosDao;
        this.productosDao = productosDao;
    }

    async registrar(datos) {
        const usuario = new Usuario(datos);
        console.log(usuario);
        const hashedPassword = hashear(datos.password);
        usuario.password = hashedPassword;
        const encryptedPassword = await encriptar(datos.password);


        // Enviar el mensaje de SMS
        /* await this.smsService.enviar({
            to: ADMIN_SMS_NUMBER,
            message: `Nuevo usuario: ${usuario.nombre} (${usuario.email})`
        }); */

        return await this.usuariosDao.create({ ...usuario.toPOJO(), password: encryptedPassword });
    }

    async obtenerUsuarioPorId(idUsuario) {
        return await this.usuariosDao.findById(idUsuario);
    }

    async comprarProducto(idUsuario, idProducto) {
        const usuario = await this.usuariosDao.readOne({ _id: idUsuario })
        if (!usuario) throw new Error()

        const producto = await this.productosDao.readOne({ _id: idProducto })
        if (!producto) throw new Error()
    }

    async darDeBaja(idUsuario) {
        const usuario = await this.usuariosDao.deleteOne({ _id: idUsuario })
        return usuario
    }

    async resetPassword(userData) {
        try {
            console.log('Iniciando resetPassword en usuariosService');
            const { email, newPassword } = userData;
            const user = await this.usuariosDao.readOne({ email });
            console.log('Usuario encontrado:', user);
            if (user) {
                const updatedUser = { ...user, password: newPassword };
                const updatedUserDoc = await this.usuariosDao.updateOne({ _id: user._id }, updatedUser);
                console.log('Usuario actualizado:', updatedUserDoc);
                return toPOJO(updatedUserDoc);
            }
            return null;
        } catch (error) {
            console.error('Error en resetPassword en usuariosService:', error);
            throw error;
        }
    }

    async updateRole(userData) {
        console.log("Service", userData.usuario)
        try {
            const { usuario, newRole } = userData;
            console.log(usuario,"....", newRole)
            if (!usuario) {
                throw new Error('Usuario no proporcionado');
            }
            const user = await this.usuariosDao.readOne({ _id: usuario });

            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            user.role = newRole;
            const updateUserDoc = await this.usuariosDao.updateOne({ _id: user._id }, user);
            console.log(updateUserDoc);
            return updateUserDoc;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
}
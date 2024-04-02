import fs from 'fs/promises';
import { matches } from '../../utils/utils.js';
import { Usuario } from '../../../models/usuarios.model.js';

export class UsuariosDaoFiles {
    constructor(path) {
        this.path = path;
    }

    async #readUsuarios() {
        try {
            let usuariosData = await fs.readFile(this.path, 'utf-8');
            if (!usuariosData) {
                usuariosData = '[]'; 
            }
            return JSON.parse(usuariosData);
        } catch (error) {
            console.error('Error al leer el archivo de usuarios:', error); 
            throw error;
        }
    }
    

    async #writeUsuarios(usuarios) {
        await fs.writeFile(this.path, JSON.stringify(usuarios, null, 2));
    }

    async create(data) {
        try {
            console.log('Datos recibidos en el DAO:', data); // Mensaje para verificar los datos recibidos en el DAO
            const usuario = new Usuario(data);
            const userPojo = usuario.toPOJO();
            console.log('Usuario POJO creado:', userPojo); // Mensaje para verificar el objeto usuarioPojo
            const usuarios = await this.#readUsuarios();
            usuarios.push(userPojo);
            console.log('Usuarios actualizados:', usuarios); // Mensaje para verificar el array de usuarios actualizado
            await this.#writeUsuarios(usuarios);
            return userPojo;
        } catch (error) {
            console.error('Error en el DAO:', error); // Mensaje para registrar cualquier error que ocurra
            throw error;
        }
    }



    async readOne(query) {
        const usuarios = await this.#readUsuarios();
        const buscado = usuarios.find(matches(query));
        return buscado;
    }

    async readMany(query) {
        const usuarios = await this.#readUsuarios();
        const buscados = usuarios.filter(matches(query));
        return buscados;
    }

    async update(query, data) {
        throw new Error('NOT IMPLEMENTED');
    }

    async updateMany(query, data) {
        throw new Error('NOT IMPLEMENTED');
    }

    async deleteOne(query) {
        const usuarios = await this.#readUsuarios();
        const indexBuscado = usuarios.findIndex(matches(query));
        if (indexBuscado !== -1) {
            const [buscado] = usuarios.splice(indexBuscado, 1);
            await this.#writeUsuarios(usuarios);
            return buscado;
        }
        return null;
    }

    async deleteMany(query) {
        throw new Error('NOT IMPLEMENTED');
    }

    async findByEmail(email) {
        const usuarios = await this.#readUsuarios();
        return usuarios.find(usuario => usuario.email === email);
    }

    async findById(id) {
        const usuarios = await this.#readUsuarios();
        return usuarios.find(usuario => usuario._id === id);
    }
    async isValidPassword(password) {
        return compareSync(password, this.password);
    }
}




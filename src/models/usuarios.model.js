import { randomUUID } from 'node:crypto'
import { CartModel } from './cart.model.js'


export class Usuario {
    #_id
    #nombre
    #email
    #password
    #cart


    constructor({ _id = randomUUID(), nombre, email, password, cart }) {
        this.#_id = _id
        this.nombre = nombre
        this.email = email
        this.password = password
        this.cart = new CartModel
    }

    get _id() { return this.#_id }
    get nombre() { return this.#nombre }
    get email() { return this.#email }
    get cart(){ return this.#cart}

    set nombre(value) {
        if (!value) throw new Error('el nombre es obligatorio')
        this.#nombre = value
    }

    set email(value) {
        if (!value) throw new Error('el email es obligatorio')
        this.#email = value
    }

    set password(value) {
        if (!value) throw new Error('la contraseña es obligatoria')
        this.#password = value
    }

    set cart(value) {
        this.#cart = value
    }

    get password() {
        return this.#password
    }

    toPOJO() {
        return {
            _id: this.#_id,
            nombre: this.#nombre,
            email: this.#email,
            password: this.#password,
            cart: this.#cart
            
        }
    }
}
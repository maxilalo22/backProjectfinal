let productos = []

window.onload = actualizarProductos

async function actualizarProductos() {
    try {
        const productos = await obtenerProdutos()
        mostrarProductos(productos)
    } catch (error) {
        alert(error.message)
    }
}

async function obtenerProdutos() {
    const res = await fetch('/api/products')
    const obj = await res.json()
    productos = obj.payload
    return productos
}

function mostrarProductos(productos) {
    // @ts-ignore
    document.querySelector('#listaLibros').innerHTML =
        productos.map(j => `- ${j.nombre} $${j.precio}`).join('<br>')
}


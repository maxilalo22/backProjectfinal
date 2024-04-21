
async function obtenerIdDelCarrito() {
    try {
        const response = await fetch('/api/sesiones/current');
        const data = await response.json();
        if (data.cartId) {
            return data.cartId; // Suponiendo que el ID del carrito está disponible en la respuesta del servidor
        }
        return null;
    } catch (error) {
        console.error('Error al obtener el ID del carrito:', error);
        return null;
    }
}

async function crearNuevoCarrito(userId) {
    try {
        const response = await fetch('/api/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        });
        const newCart = await response.json();
        return newCart;
    } catch (error) {
        console.error('Error al crear un nuevo carrito:', error);
        throw error;
    }
}

const addToCartButtons = document.querySelectorAll('.addToCart');

addToCartButtons.forEach(addToCart => {
    addToCart.addEventListener('click', async event => {
        event.preventDefault();
        const productId = addToCart.dataset.productId;

        try {
            // Verificar la autenticación consultando al servidor
            const response = await fetch('/api/sesiones/auth');
            const data = await response.json();
            const usuarioAutenticado = req.isAuthenticated()

            console.log(usuarioAutenticado); // Para verificar la respuesta del servidor

            if (usuarioAutenticado) {
                // Obtener el ID del carrito existente o crear uno nuevo si no existe
                let cartId = await obtenerIdDelCarrito();

                console.log('Cart ID:', cartId); // Para verificar el ID del carrito obtenido

                // Si no hay un carrito existente, crea uno nuevo y obtén su ID
                if (!cartId) {
                    const userId = data.userId; // Suponiendo que el ID del usuario está disponible en la respuesta del servidor
                    const newCart = await crearNuevoCarrito(userId);
                    cartId = newCart._id; // Asumiendo que el ID del carrito está disponible en la respuesta del servidor
                }

                console.log('Cart ID after creation:', cartId); // Para verificar el ID del carrito después de la creación
                
                // Si el usuario está autenticado, agregar el producto al carrito
                const addToCartResponse = await fetch(`/api/carts/${cartId}/product/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ quantity: 1 })
                });
                console.log('Add to cart response:', addToCartResponse); // Para verificar la respuesta al agregar al carrito

                if (addToCartResponse.ok) {
                    console.log('Producto agregado correctamente al carrito.');
                    alert('Producto agregado al carrito exitosamente!.');
                } else {
                    console.error('Error al agregar el producto al carrito:', addToCartResponse.status);
                    alert('Hubo un error al agregar el producto al carrito. Por favor, inténtelo de nuevo más tarde.');
                }
            } else {
                // Si el usuario no está autenticado, redirigirlo al formulario de inicio de sesión
                alert('Debes iniciar sesión primero!');
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error al verificar autenticación:', error);
        }
    });
});




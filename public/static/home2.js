
const addToCartButtons = document.querySelectorAll('.addToCart');

addToCartButtons.forEach(addToCart => {
    addToCart.addEventListener('click', async event => {
        event.preventDefault();
        const productId = addToCart.dataset.productId;
        const quantityInput = addToCart.previousElementSibling.querySelector('.productQuantity');
        const quantity = parseInt(quantityInput.value);
        try {
            const authResponse = await fetch('/api/sesiones/auth');
            const authData = await authResponse.json();
            const usuarioAutenticado = authData.autenticado

            if (!usuarioAutenticado) {
                alert('Debes iniciar sesión primero!');
                window.location.href = '/login';
            }

            const reqUserResponse = await fetch('/api/sesiones/current', {
                method: 'GET'
            })

            if (reqUserResponse.ok) {
                const userData = await reqUserResponse.json();
                const cartId = userData.payload.cartId; 

                const addToCartResponse = await fetch(`/api/carts/${cartId}/product/${productId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ quantity }) 
                });

                if (addToCartResponse.ok) {
                    alert("Producto agregado al carrito correctamente!")
                }
            } else {
                alert(error)
                console.error('Error al obtener los datos del usuario:', reqUserResponse.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    });
});




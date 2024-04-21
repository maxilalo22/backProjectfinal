const addToCartButtons = document.querySelectorAll('.addToCart');

addToCartButtons.forEach(addToCart => {
    addToCart.addEventListener('click', async event => {
        event.preventDefault();
        const productId = addToCart.dataset.productId;

        try {
            const authResponse = await fetch('/api/sesiones/auth');
            const authData = await authResponse.json();
            console.log(authData)
            const usuarioAutenticado = authData.autenticado
            let cartId = authData.car

            if (usuarioAutenticado) {
                const cartCreateResponse = await fetch('/api/carts/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (cartCreateResponse.ok) {
                    console.log('Carrito creado exitosamente');
                    const newCartData = await cartCreateResponse.json();
                    const cartId = newCartData._id;
                    const saveCartIdResponse = await fetch('/api/sesiones/cartId', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ cartId })
                    });
                } else {
                    alert('Debes iniciar sesión primero!');
                    window.location.href = '/login';
                }

                const sessionCartResponse = await fetch('/api/sesiones/cartId', {
                    method: "GET",
                    headers: { 'Content-Type': 'application/json' }
                });
                
                if (sessionCartResponse.ok) {
                    const { cartId } = await sessionCartResponse.json();
                    const addToCartResponse = await fetch(`/api/carts/${cartId}/product/${productId}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    });

                    if (addToCartResponse.ok) {
                        console.log('Producto agregado al carrito exitosamente');
                        alert('Producto agregado al carrito exitosamente!');
                    } else {
                        console.error('Error al agregar producto al carrito:', addToCartResponse.status);
                        alert('Hubo un error al agregar producto al carrito. Por favor, inténtelo de nuevo más tarde.');
                    }
                } else {
                    console.error('Error al crear carrito:', cartCreateResponse.status);
                    alert('Hubo un error al crear el carrito. Por favor, inténtelo de nuevo más tarde.');
                }
            }
        } catch (error) {
            console.error('Error al verificar autenticación:', error);
        }
    });
});



const checkoutButton = document.querySelector('.checkout')

checkoutButton.addEventListener('click', async event => {
    event.preventDefault();
    try {
        const reqUserResponse = await fetch('/api/sesiones/current', {
            method: 'GET'
        })

        if (reqUserResponse.ok) {
            const userData = await reqUserResponse.json();
            const cartId = userData.payload.cartId; 
            const checkResponse = await fetch(`/api/carts/${cartId}/purchase`,{
                method: 'POST'
            });
            const data = await checkResponse.json();
            const orderId = data._id; 
            window.location.href = `/ticket/${orderId}`;
        }

        
    } catch (error) {
        throw error
    }
});

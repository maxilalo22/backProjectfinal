/* const formResetPwd = document.querySelector('form')

formResetPwd?.addEventListener('submit', async event => {
    event.preventDefault()

    const response = await fetch('/api/usuarios/resetpassword', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(new FormData(formResetPwd))
    })
    
    if (response.status === 200) {
        console.log("Contraseña actualizada correctamente!");
        alert("Contraseña actualizada correctamente!");
        window.location.href = '/login';
    } else {
        const error = await response.json();
        console.log(error.message);
        //alert(error.message);
    }
    
}) */

// Importar el servicio de correo electrónico
const formResetPwd = document.querySelector('#resetPasswordForm');

formResetPwd.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(formResetPwd);
    const email = formData.get('email');

    try {
        const response = await fetch('/api/usuarios/resetpassword', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            console.log("Correo de restablecimiento enviado correctamente!");
            alert("Se ha enviado un correo de restablecimiento de contraseña. Por favor, revise su bandeja de entrada.");
        } else {
            const error = await response.json();
            console.error(error.message);
            alert("Ha ocurrido un error al enviar el correo de restablecimiento de contraseña.");
        }
    } catch (error) {
        console.error("Ha ocurrido un error en la solicitud:", error);
        alert("Ha ocurrido un error en la solicitud.");
    }
});



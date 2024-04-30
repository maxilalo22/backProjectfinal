
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



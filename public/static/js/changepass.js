const formChangePassword = document.querySelector('#changePasswordForm');

formChangePassword.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(formChangePassword);
    const newPassword = formData.get('newPassword');

    const response = await fetch('/api/usuarios/changepassword', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword })
    });

    if (response.status === 200) {
        alert("Contraseña cambiada correctamente!");
        window.location.href = '/login';
    } else {
        const error = await response.json();
        console.error(error.message);
        alert("Ha ocurrido un error al cambiar la contraseña.");
    }
});
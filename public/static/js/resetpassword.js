const formResetPwd = document.querySelector('form')

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
        window.location.href = '/login'
    } else {
        const error = await response.json()
        alert(error.message)
    }
})
const formLogin = document.querySelector('form');

formLogin?.addEventListener('submit', async event => {
  event.preventDefault();

  const formData = new FormData(formLogin);

  try {
    const response = await fetch('/api/sesiones/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData)
    });

    if (response.ok) {
      const sesion = await response.json();
      alert(JSON.stringify(sesion));
      window.location.href = '/profile';
    } else {
      const error = await response.json();
      alert(error.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error en la solicitud');
  }
});

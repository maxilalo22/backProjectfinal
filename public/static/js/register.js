const formRegister = document.querySelector('.registrar');

formRegister?.addEventListener('submit', async event => {
  event.preventDefault();

  const formData = new FormData(formRegister);
  const body = new URLSearchParams(formData);

  try {
    const response = await fetch('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body
    });

    const data = await response.json(); 
    
    if (response.ok) {
      alert("Usuario creado correctamente!");
      window.location.href = '/login';
    } else {
      const error = data.error;
      alert(error.message);
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    alert('Error al registrar usuario. Por favor, inténtalo de nuevo.');
  }
});



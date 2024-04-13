// profile.js

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/sesiones/current',{
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error('Error al obtener los datos del usuario');
    }
    const data = await response.json();
    actualizarVista(data.payload); // Actualiza la vista de Handlebars con los datos del usuario
  } catch (error) {
    console.error('Error:', error);
    // Manejar el error en caso de que no se puedan obtener los datos del usuario
  }
});

function actualizarVista(usuario) {
  // Actualiza los elementos en la vista de Handlebars con los datos del usuario
  console.log("Datos:" + usuario)
  document.getElementById('spanNombre').textContent = usuario.nombre;
  document.getElementById('spanEmail').textContent = usuario.email;
}

document.getElementById('logout-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const response = await fetch('/api/sesiones/logout', {
      method: 'POST'
    });
    
    if (response.ok) {
      // Redirigir al usuario a la página de inicio de sesión u otra página
      window.location.href = '/login';
    } else {
      // Manejar errores si la solicitud no fue exitosa
      console.error('Error al cerrar sesión:', response.statusText);
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
});


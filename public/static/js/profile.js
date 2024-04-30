

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/sesiones/current',{
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error('Error al obtener los datos del usuario');
    }
    const data = await response.json();
    actualizarVista(data.payload); 
  } catch (error) {
    console.error('Error:', error);
  }
});

function actualizarVista(usuario) {
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
      window.location.href = '/login';
    } else {
      console.error('Error al cerrar sesión:', response.statusText);
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
});


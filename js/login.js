// Función para iniciar sesión
function iniciarSesion() {
    // Obtener los datos del usuario del formulario de inicio de sesión
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Obtener la lista de usuarios registrados del localStorage
    var usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar el usuario por su correo electrónico
    var usuarioEncontrado = usuariosRegistrados.find(function(usuario) {
        return usuario.email === email && usuario.password === password;
    });

    // Verificar si se encontró el usuario
    if (usuarioEncontrado) {
        // El usuario ha iniciado sesión correctamente
        // Aquí podrías redirigirlo a la página de perfil o realizar otras acciones
        alert("Inicio de sesión exitoso. Bienvenido, " + usuarioEncontrado.nombre + "!");
    } else {
        // Las credenciales son incorrectas
        alert("Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
}



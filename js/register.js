function registrarUsuario() {
    // Obtener los datos del usuario del formulario de registro
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Crear un objeto para almacenar los datos del usuario
    var nuevoUsuario = {
        nombre: nombre,
        email: email,
        password: password
    };

    // Obtener la lista de usuarios registrados del localStorage
    var usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Agregar el nuevo usuario a la lista
    usuariosRegistrados.push(nuevoUsuario);

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = "/indexs/login.html";
}


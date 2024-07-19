document.getElementById('loginButton').addEventListener('click', () => {
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;

    // Obtener usuarios registrados del almacenamiento local
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si existe un usuario con el correo electrónico y la contraseña proporcionados localmente
    const userLocal = users.find(user => user.email === correo && user.password === contraseña);
    if (userLocal) {
        alert('Inicio de sesión exitoso. Redirigiendo...');
        // Redirige al usuario al archivo index.html o a donde sea que desees
        window.location.href = '/frontend/indexs/indexAL.html';
    } else {
        // Si no se encuentra en el almacenamiento local, realiza la solicitud a la API
        const url = `https://my.api.mockaroo.com/users.json?key=1ad56380`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const usuarios = data;
                const usuarioValido = usuarios.find(usuario => usuario.email === correo);
                if (usuarioValido) {
                    if (usuarioValido.password === contraseña) {
                        alert('Inicio de sesión exitoso. Redirigiendo...');
                        // Redirige al usuario al archivo index.html
                        window.location.href = '/frontend/indexs/index.html';
                    } else {
                        alert('Contraseña incorrecta. Inténtalo de nuevo.');
                    }
                } else {
                    alert('Correo inválido. Inténtalo de nuevo.');
                }
            })
            .catch(error => {
                console.error('Error al obtener usuarios:', error);
                alert('Ocurrió un error. Por favor, inténtalo de nuevo más tarde.');
            });
    }
});

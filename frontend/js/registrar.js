document.getElementById('registerButton').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!username || !email || !password || !confirmPassword) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    
    if (!email.includes('@')) {
        alert('Por favor, ingrese una dirección de correo electrónico válida.');
        return;
    }

    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        return;
    }

    // Simulamos guardar el usuario en una lista
    const newUser = { username, email, password };
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registro exitoso. Ahora puedes iniciar sesión.');

    
    window.location.href = '/frontend/indexs/login.html';
});

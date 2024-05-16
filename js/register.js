document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, introduce un correo electrónico válido.');
        return; 
    }

    
    var users = JSON.parse(localStorage.getItem('users')) || [];

    
    users.push({ username: username, email: email, password: password });

    
    localStorage.setItem('users', JSON.stringify(users));

    
    window.location.href = 'index.html';
});

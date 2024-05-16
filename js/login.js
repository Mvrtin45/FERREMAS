document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, introduce un correo electrónico válido.');
        return; 
    }

    
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    
    window.location.href = 'index.html';
});


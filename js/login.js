$(document).ready(function() {
    $('#loginForm').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        messages: {
            email: {
                required: 'Por favor, ingrese su correo electrónico',
                email: 'Por favor, ingrese un correo electrónico válido'
            },
            password: {
                required: 'Por favor, ingrese su contraseña'
            }
        },
        submitHandler: function(form) {
            var email = $('#email').val();
            var password = $('#password').val();
            
            var userData = {
                email: email,
                password: password
            };
            
            var userDataJSON = JSON.stringify(userData);
            
            localStorage.setItem('userData', userDataJSON);
            
            window.location.href = '/perfil.html';
        }
    });
});



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
            addUser();
            var email = $('#email').val();
            var password = $('#password').val();
            
            var userData = {
                email: email,
                password: password
            };
            
            var userDataJSON = JSON.stringify(userData);
            
            localStorage.setItem('userData', userDataJSON);
            
            alert('Sesión Iniciada correctamente');

            return false;
        }
    });
});

function addUser(){
    console.log('Se ingresó el Usuario')
    let email = $('#email').val();
    let password = $('#password').val();
};



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
            form.reset();
            return false;
        }
    });
    loadUsers();
});

function addUser(){
    var email = $('#email').val();
    var password = $('#password').val();
    var User = { Email: email, Password: password}

    saveUserToStorage(User);
};

function loadUsers(){
    if(localStorage.getItem('Users')){
        var Users = JSON.parse(localStorage.getItem('Users'));
    }
}

function saveUserToStorage(User){
    var Users = localStorage.getItem('Users') ? JSON.parse(localStorage.getItem('Users')) : [];
    Users.push(User);
    localStorage.setItem('Users', JSON.stringify(Users));
}




const cambiarCorreo = document.getElementById("cambiarcorreo");
const cambiarCorreoBoton = document.getElementById("Correobutton");


cambiarCorreoBoton.addEventListener("click", function() {
    const correo = cambiarCorreo.value;

  
    if (!correo.trim()) {
        alert("Por favor, ingrese su correo electrónico.");
        return;
    }

    
    if (!correo.includes('@')) {
        alert("Por favor, ingrese un correo electrónico válido con '@'.");
        return;
    }

    console.log("Correo Electrónico:", correo);
    window.location.href = "/frontend/indexs/login.html";
});

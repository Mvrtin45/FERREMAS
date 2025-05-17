document.addEventListener("DOMContentLoaded", () => {
    const adminUsuarios = [
        {
            nombre: "admin1",
            usuario: "admin1",
            rut: "12345678-9",
            redirect: "/frontend/indexs/Vendedor/admin1.html"
        },
        {
            nombre: "admin2",
            usuario: "admin2",
            rut: "98765432-1",
            redirect: "/frontend/indexs/Bodeguero/admin2.html"
        },
        {
            nombre: "admin3",
            usuario: "admin3",
            rut: "11222333-4",
            redirect: "/frontend/indexs/Contador/admin3.html"
        }
    ];

    // Referencias al DOM
    const usuarioInput = document.getElementById("usuario");
    const contraseñaInput = document.getElementById("contraseña");
    const loginButton = document.getElementById("loginButton");

    const loginSection = document.getElementById("loginSection");
    const changePasswordSection = document.getElementById("changePasswordSection");
    const nuevaContraseñaInput = document.getElementById("nuevaContraseña");
    const confirmarContraseñaInput = document.getElementById("confirmarContraseña");
    const cambiarButton = document.getElementById("cambiarButton");

    let usuarioActual = null;

    // Evento de login
    loginButton.addEventListener("click", () => {
        const nombreUsuario = usuarioInput.value.trim().toLowerCase();
        const rut = contraseñaInput.value.trim();

        const admin = adminUsuarios.find(u => u.usuario === nombreUsuario && u.rut === rut);
        const registrados = JSON.parse(localStorage.getItem("admins") || "[]");
        const registrado = registrados.find(u => u.usuario === nombreUsuario);

        if (admin && !registrado) {
            // Primer login: solicitar cambio de contraseña
            usuarioActual = {
                usuario: admin.usuario,
                nombre: admin.nombre,
                redirect: admin.redirect
            };

            loginSection.style.display = "none";
            changePasswordSection.style.display = "block";
            alert("Primer inicio de sesión detectado. Por favor, cambia tu contraseña.");
        } else if (registrado && registrado.contraseña === rut) {
            // Ya había cambiado la contraseña
            window.location.href = registrado.redirect;
        } else {
            alert("Credenciales incorrectas.");
        }
    });

    // Evento para cambiar la contraseña
    cambiarButton.addEventListener("click", () => {
        const nueva = nuevaContraseñaInput.value.trim();
        const confirmar = confirmarContraseñaInput.value.trim();

        if (!nueva || !confirmar) {
            return alert("Debes completar ambos campos.");
        }

        if (nueva !== confirmar) {
            return alert("Las contraseñas no coinciden.");
        }

        const admins = JSON.parse(localStorage.getItem("admins") || "[]");
        admins.push({
            usuario: usuarioActual.usuario,
            nombre: usuarioActual.nombre,
            contraseña: nueva,
            redirect: usuarioActual.redirect
        });
        localStorage.setItem("admins", JSON.stringify(admins));

        alert("Contraseña actualizada correctamente.");
        window.location.href = usuarioActual.redirect;
    });
    /*
    LIMPIAR CONTRASEÑAS DE ADMINISTRADORES
    function resetAdmins() {
        localStorage.removeItem("admins");
        alert("Los datos de administradores han sido reiniciados.");
    }
    resetAdmins();
    */
});

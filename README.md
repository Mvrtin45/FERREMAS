# Pagina-WEB-TramitesOnline
Desarrollo de pagina web, dedicada a facilitar los tramites presenciales, desde la comodidad del hogar. 
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>To Do List - Inicio</title>
</head>
<body>

    <header>
        <h1>Bienvenido a To Do List</h1>
    </header>
    <main>
        <form action="/login" method="post">
            <label for="email"><b>Correo electrónico:</b></label>
            <input type="email" id="email" name="email" required>
            <label for="password"><b>Contraseña:</b></label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Iniciar sesión</button>
        </form>
        <a href="registro.html">Registrarse</a> | <a href="recuperar_password.html">Olvidé mi contraseña</a>
    </main>
</body>
</html>

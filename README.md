# PATAGÓN - Sistemas de pagos

Este proyecto implementa un sistema de pagos, que incluye la autenticación de usuarios, registro, envío de correos electrónicos y creación de usuarios por parte de un administrador.


## Características
- Autenticación de usuarios.
- Registro de usuarios con validación por correo electrónico.
- Creación de cuentas por parte de administradores.
- Sistema basado en endpoints REST para login y registro.


## Requisitos Previos

- **Node.js** 
- **PostgreSQL** 


## Instalación

1. Clonar el repositorio:

    ```
    bash
    git clone https://github.com/CreativeSelf1/PATAGON-Sistemas-de-pagos.git
    ```
2. Instalar dependencias para backend y frontend:
    ```
    bash

    cd Backend
    npm install
    cd ../Frontend
    npm install
    ```

4. Iniciar el servidor:
    ```
    bash

    cd Backend
    npm run dev

    cd ../Frontend
    npm run dev
    ```

## Endpoints


1. POST `http://localhost:3004/api/command/login`: Envía correo y contraseña, devuelve token
2. POST `http://localhost:3004/api/command/register`: Envía correo, username, y contraseña para registro
3. POST `http://localhost:3004/api/command/new-user-creation`: Admin registra nuevo usuario, aceptado en solicitud para uso de Patagón
4. POST `http://localhost:3004/api/command/send-email`: Correo de solicitud aceptada/rechazada a cliente


## Licencia
Este proyecto está licenciado bajo la licencia MIT.

## Requisitos funcionales
- Autenticación de usuarios.
- Manejo de solicitudes
- Gestor de usuarios
- Controlador de estadísticas y logs
- Visualizador de bolsas
- Gestor de pagos
- Gestor de bolsas de uso
- Gestor de notificaciones
- Historial de uso y compras
- Gestor de roles
## Requisitos no funcionales
- Responsividad
- Rapidez
- Alta capacidad de usuarios
- Seguridad
- Usabilidad

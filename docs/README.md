# Proyecto Web con Arquitectura de Tres Capas

Este proyecto implementa una aplicación web siguiendo una **arquitectura de tres capas** (Front-End, Back-End y Base de Datos), e incluye configuraciones de servicios complementarios como servidor FTP/SFTP, DNS (Bind9) y LDAP (OpenLDAP).

---

## 1. Descripción General

- **Capa de Presentación (Front-End)**: Responsabilidad de la interfaz de usuario y validación en el navegador.
- **Capa de Negocio (Back-End)**: Lógica de negocio, control de flujos y autenticación/autorización con JWT.
- **Capa de Datos**: Base de datos relacional (MySQL) o NoSQL (MongoDB), almacenando de manera segura y confiable la información.

Además, se han configurado:

- **Servidor Web (Apache)**: Maneja los Virtual Hosts y puede funcionar como proxy inverso.
- **Servidor de Archivos (FTP/SFTP)**: Permite la transferencia de ficheros de forma segura.
- **Servidor DNS (Bind9)**: Gestiona el dominio y los registros (A, NS, MX, etc.).
- **Servicio de Directorio (OpenLDAP)**: Centraliza la autenticación y gestión de usuarios/grupos.

---

## 2. Documentación

La carpeta `docs/` contiene la siguiente documentación detallada:

1. **`docs/arquitectura.md`**  
   Describe en profundidad la arquitectura de tres capas, los componentes involucrados y el diagrama representativo.

2. **`docs/setup.md`**  
   Instrucciones paso a paso para la instalación y configuración de todos los servicios (Apache, Node.js, MySQL, Bind9, vsftpd/SFTP, LDAP, etc.).

3. **`docs/testing.md`**  
   Explica el proceso de pruebas unitarias, de integración, de rendimiento y de seguridad, con ejemplos de código y herramientas recomendadas.

---

## 3. Tecnologías Principales

- **Node.js** + **Express** para la capa de Negocio.
- **MySQL** (o PostgreSQL/MongoDB) para la capa de Datos.
- **Apache** o **Nginx** como servidor web.
- **OpenSSL** para certificados SSL/TLS.
- **Bind9** para DNS, **vsftpd** para FTP o configuración SFTP con OpenSSH.
- **OpenLDAP** para servicios de directorio.

---

## 4. Características Destacadas

1. **Autenticación con JWT**  
   Registra y autentica usuarios con tokens JWT, protegiendo rutas sensibles.

2. **Validación y Sanitización**  
   Uso de **express-validator** para evitar ataques de inyección de código y asegurar la calidad de datos.

3. **Modularidad y Escalabilidad**  
   Separación de responsabilidades (Front-End, Back-End, Datos) que facilita el mantenimiento y la ampliación del proyecto.

4. **Seguridad Adicional**  
   - Soporte para cifrado de contraseñas con **bcrypt**.  
   - Acceso seguro a la base de datos y aislamiento de la misma.  
   - Integración con servicios LDAP y SSL/TLS.

---

## 5. Requisitos Previos

- **Ubuntu 20.04 o superior** (o una distro Linux equivalente).
- **Permisos de administrador** (sudo) para la instalación de paquetes y configuración de servicios.
- **Node.js** y **npm** instalados.  
- **MySQL** (u otro motor de BD) configurado con las credenciales adecuadas.

---

## 6. Instrucciones Rápidas de Uso

1. **Clonar el Repositorio**

   ```bash
   git clone https://github.com/usuario/proyecto-tres-capas.git
   cd proyecto-tres-capas

    Instalar Dependencias

npm install

Configurar Variables de Entorno

    Crea un archivo .env en la raíz con información como:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_base_datos
    JWT_SECRET=clave_secreta
    PORT=3000

Iniciar la Aplicación

npm start

    La aplicación se ejecutará en el puerto definido en el archivo .env (por defecto, 3000).

Acceder a la Aplicación

    Abre el navegador y visita:

        http://localhost:3000 

        Ajusta tu Virtual Host en Apache o el proxy inverso si deseas exponer el servicio a un dominio (p. ej. www.tusitio.com).

7. Pruebas

    Para ejecutar las pruebas unitarias (si usas Jest/Mocha):

    npm run test

    Revisa docs/testing.md para información detallada sobre todas las pruebas realizadas.

8. Estructura del Proyecto

proyecto-tres-capas/
├── docs/
│   ├── arquitectura.md
│   ├── setup.md
│   ├── testing.md
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
├── config/
├── .env (ignorado en .gitignore)
├── .gitignore
├── package.json
└── README.md

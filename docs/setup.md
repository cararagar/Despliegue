docs/setup.md

# Guía de Instalación y Configuración

Este documento explica, de manera paso a paso, cómo desplegar los componentes principales de la aplicación: servidor web, servidor de aplicaciones, base de datos y servicios adicionales (DNS, FTP/SFTP, LDAP).

---

## 1. Requisitos Previos

- **Sistema Operativo**: Ubuntu 20.04 o superior (o distribución equivalente).
- **Permisos de Administrador (sudo)**.
- Conexión a Internet para descargar paquetes.

---

## 2. Instalación del Servidor Web (Apache)

1. **Actualizar Repositorios y Paquetes**

   ```bash
   sudo apt update && sudo apt upgrade -y

    Actualiza la lista de paquetes y aplica las últimas actualizaciones disponibles.

    Instalar Apache

sudo apt install apache2 -y

    Instala el servidor web Apache.

Verificar Funcionamiento

    Accede a http://localhost o a la IP del servidor.
    Deberías ver la página de bienvenida de Apache.

Configurar Virtual Host

    Crea un archivo: /etc/apache2/sites-available/proyecto.conf
    Ejemplo de configuración:

<VirtualHost *:80>
    ServerAdmin admin@tusitio.com
    ServerName www.tusitio.com
    DocumentRoot /var/www/proyecto

    <Directory /var/www/proyecto>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>

Habilita el sitio y recarga Apache:

        sudo a2ensite proyecto.conf
        sudo systemctl reload apache2

3. Configuración del Servidor de Aplicaciones (Node.js)

    Instalar Node.js y npm
        Para Ubuntu, se puede usar el repositorio oficial de NodeSource o la versión por defecto de los repositorios.

sudo apt install nodejs npm -y

Configurar el Proyecto

    Crear la estructura de carpetas:

proyecto/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
├── config/
├── .env
├── package.json
└── README.md

Inicializar npm:

cd proyecto
npm init -y

Instalar dependencias esenciales:

    npm install express mysql bcrypt jwt-simple express-validator dotenv

Archivo .env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=contraseña
DB_NAME=base_de_datos
JWT_SECRET=clave_secreta
PORT=3000

Archivo Principal (src/app.js)

require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const userRoutes = require('./routes/users');
const dataRoutes = require('./routes/data');
app.use('/users', userRoutes);
app.use('/data', dataRoutes);

// Iniciar Servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});

Ejecutar la Aplicación

    Añadir el script en package.json:

"scripts": {
  "start": "node src/app.js"
}

Ejecutar:

        npm start

4. Configuración de la Base de Datos (MySQL)

    Instalar MySQL Server

sudo apt install mysql-server -y

Asegurar la Instalación

sudo mysql_secure_installation

    Se configurará la contraseña para el usuario root y otras opciones de seguridad.

Crear Base de Datos y Usuario

    sudo mysql -u root -p

    CREATE DATABASE base_de_datos;
    CREATE USER 'usuario'@'localhost' IDENTIFIED BY 'contraseña_segura';
    GRANT ALL PRIVILEGES ON base_de_datos.* TO 'usuario'@'localhost';
    FLUSH PRIVILEGES;
    EXIT;

    Probar Conexión desde Node.js
        Asegurarse de que DB_HOST, DB_USER, DB_PASSWORD y DB_NAME coincidan con lo creado.

5. Configuración de SSL (Opcional)

    Generar Certificado SSL con OpenSSL

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/mysite.key \
  -out /etc/ssl/certs/mysite.crt

Configurar Virtual Host SSL

    Archivo /etc/apache2/sites-available/proyecto-ssl.conf

<IfModule mod_ssl.c>
    <VirtualHost _default_:443>
        ServerAdmin admin@tusitio.com
        ServerName www.tusitio.com
        DocumentRoot /var/www/proyecto

        <Directory /var/www/proyecto>
            Options Indexes FollowSymLinks
            AllowOverride All
            Require all granted
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/error_ssl.log
        CustomLog ${APACHE_LOG_DIR}/access_ssl.log combined

        SSLEngine on
        SSLCertificateFile /etc/ssl/certs/mysite.crt
        SSLCertificateKeyFile /etc/ssl/private/mysite.key
    </VirtualHost>
</IfModule>

Habilitar SSL:

        sudo a2enmod ssl
        sudo a2ensite proyecto-ssl.conf
        sudo systemctl reload apache2

6. Servicios Adicionales
6.1 Servidor DNS (Bind9)

    Instalación

sudo apt install bind9 bind9utils bind9-doc -y

Configurar Zona

    Editar /etc/bind/named.conf.local:

    zone "tusitio.com" {
        type master;
        file "/etc/bind/db.tusitio.com";
    };

    Crear /etc/bind/db.tusitio.com con los registros A, NS, MX, etc.

Reiniciar

    sudo systemctl restart bind9

6.2 Servidor de Archivos (FTP/SFTP)

    Opción FTP (vsftpd):

    sudo apt install vsftpd -y

    Editar /etc/vsftpd.conf para ajustar parámetros de seguridad y reiniciar el servicio.

    Opción SFTP:
        Configurar /etc/ssh/sshd_config con internal-sftp y crear grupo sftpusers.

6.3 Servicio de Directorio (LDAP con OpenLDAP)

    Instalar

    sudo apt install slapd ldap-utils -y

    Configurar
        Definir la base dc=tusitio,dc=com y la contraseña de admin.
        Crear unidades organizativas, usuarios y grupos mediante archivos .ldif.

7. Finalización de la Configuración

Tras instalar y configurar cada componente:

    Revisa los archivos de log (/var/log/apache2, /var/log/mysql, etc.) para confirmar que no hay errores.
    Prueba acceder a la aplicación web en http://www.tusitio.com (puerto 80) y, si configuraste SSL, en https://www.tusitio.com.

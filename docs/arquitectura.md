# Arquitectura de la Aplicación

Este documento describe la **arquitectura de tres capas** adoptada en el proyecto, las tecnologías seleccionadas y un análisis de los pros y contras de esta aproximación.

---

## 1. Resumen de la Arquitectura

La aplicación se divide en **tres capas** principales:

1. **Capa de Presentación (Front-End)**
   - **Tecnologías**: HTML, CSS, JavaScript y Frameworks (React, Vue.js o Angular).
   - **Responsabilidad**: Proporcionar la interfaz gráfica y la interacción con el usuario. Se encarga de la validación de formularios en el cliente y de consumir los servicios expuestos por la capa de Negocio.

2. **Capa de Negocio (Back-End)**
   - **Tecnologías**: Node.js (con Express), Python (con Django) o Java (con Spring), dependiendo de la implementación elegida.
   - **Responsabilidad**: Gestionar la lógica de negocio, orquestar el flujo de datos entre la presentación y la base de datos, manejar autenticación y autorización, y exponer APIs o endpoints consumibles por la capa de Presentación.

3. **Capa de Datos**
   - **Tecnologías**: Bases de datos relacionales (MySQL, PostgreSQL) o NoSQL (MongoDB). En este proyecto, se ejemplifica con MySQL.
   - **Responsabilidad**: Almacenar y proveer acceso seguro y confiable a los datos. Se encarga de procesar las consultas (inserciones, lecturas, actualizaciones, borrados) y garantizar la integridad de la información.

---

## 2. Diagrama de la Arquitectura

A continuación se muestra un diagrama representativo:

┌───────────────┐ ┌─────────────────────┐ ┌───────────────────┐ │ (Cliente) │ │ Capa de Negocio │ │ Capa de Datos │ │ Navegador Web │ ---> │ (Servidor Node.js) │ ---> │ (Base de Datos) │ │ (Front-End) │ │ + Lógica Negocio │ │ (MySQL/PostgreSQL)│ └───────────────┘ └─────────────────────┘ └───────────────────┘

markdown
Copiar
Editar

- El **Front-End** se comunica con el servidor de aplicaciones mediante **peticiones HTTP/HTTPS** (REST, por ejemplo).
- El **Back-End** a su vez gestiona la lógica y se conecta a la **Base de Datos** a través de un driver o librería (MySQL, Sequelize, etc.).

---

## 3. Tecnologías Empleadas

- **Servidor Web**: Apache o Nginx (en muchos casos, puede haber un proxy inverso delante de la aplicación Node.js).  
- **Servidor de Aplicaciones**: Node.js con Express.  
- **Base de Datos**: MySQL (en el ejemplo) o cualquier otra base de datos relacional/NoSQL.  
- **Herramientas de Seguridad**: SSL/TLS, Autenticación básica, JWT (JSON Web Tokens) para rutas protegidas.  
- **Servicios Adicionales**:  
  - **Servidor de Archivos**: vsftpd (FTP) o SFTP (SSH).  
  - **Servidor DNS**: Bind9.  
  - **Servicio de Directorio**: OpenLDAP.

---

## 4. Análisis de Ventajas y Desventajas

### Ventajas

1. **Modularidad**  
   Permite mantener y escalar cada capa de forma independiente, reduciendo la complejidad en caso de actualizaciones o correcciones.

2. **Escalabilidad**  
   Cada capa puede escalarse horizontal o verticalmente según la demanda (por ejemplo, añadir más servidores para la capa de Negocio).

3. **Mantenibilidad**  
   Separar la lógica de negocio de la presentación facilita la detección de errores y el desarrollo de nuevas funcionalidades sin romper otras partes del sistema.

4. **Seguridad**  
   La base de datos se aísla de la red pública, y se pueden agregar capas de autenticación y cifrado en la comunicación.

### Desventajas

1. **Mayor Complejidad Inicial**  
   Requiere una planificación y configuración más detallada que una arquitectura monolítica.

2. **Latencia Adicional**  
   Cada llamada entre capas introduce un salto de red, lo que puede incrementar la latencia si no se maneja adecuadamente.

3. **Costos de Infraestructura**  
   Múltiples servidores o contenedores pueden generar costos adicionales (especialmente en entornos Cloud).

---

## 5. Conclusiones de la Arquitectura

La arquitectura de tres capas es una solución madura y extensamente utilizada en proyectos de diversa magnitud. Ofrece una buena combinación de escalabilidad, mantenibilidad y seguridad, aunque requiere una mayor inversión en términos de planeación y despliegue inicial. 

Para aprovecharla al máximo, se recomiendan prácticas de **integración y despliegue continuo (C

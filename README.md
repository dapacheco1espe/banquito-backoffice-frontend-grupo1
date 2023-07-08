# Banquito APP Grupo 1
Para correr el siguiente proyecto realizado en Angular, es necesario realizar o constatar lo siguiente

## Node JS
Se debe tener una versión de node 14.17.3 y una versión de npm 6.14.13. Esto debe verificarse con los siguientes comandos ``node -v`` y ``npm -v``.
Esta versión de node se encuentra en el enlace https://nodejs.org/gl/blog/release/v14.17.3
## Angular CLI
Se debe instalar Angular CLI en su version 12.2.3 con el comando ``npm install -g @angular/cli@12.2.3``.

## Instalación (Mucha atención)
Una vez tengamos instalado node y Angular  debemos ejecutar el comando ``npm install``. Ojo, no ejecutaremos nunca el comando ``npm update`` bajo ninguna circunstancia, debido a que si se lo realiza puede romper el proyecto y no se ejecutará.

## Ejecución del proyecto
Para ejecutar el proyecto usamos el comando ``ng serve -o``. De esta forma el proyecto se compilará y se abrirá en una pestaña del navegador. 

## Errores en initial commit
En caso de que al abrir el proyecto y este presente problemas respecto a JWT, se deberá realizar un logout de la plataforma para resetear el JWT token.

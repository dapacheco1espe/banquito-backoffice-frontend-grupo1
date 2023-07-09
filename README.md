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

## Editar barra de navegación
Para editar la barra de navegación, es decir agregar o quitar items, debemos ubicarnos en el directorio app/mock-api/common/navigation. Dentro de este editamos el archivo data.ts. El que debemos editar es el objeto defaultNavigation. 
En id le damos un nombre de id que identifique el item del menú.
En type podemos ubicar solo estos valores:
- aside: Abre un submenú, en lugar de la propiedad link, tiene la propiedad children.
Esta configuración la realizamos de acuerdo al tipo de navegación, por defecto este proyecto se configuró en compact.
``js
export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'user-interface',
        title   : 'UI',
        tooltip : 'UI',
        type    : 'aside',
        icon    : 'heroicons_outline:collection',
        children: [
            {
                id   : 'apps.academy',
                title: 'Academy',
                type : 'basic',
                icon : 'heroicons_outline:academic-cap',
                link : '/apps/academy'
            },
        ]
    }
];
``
- basic: Es un item de menú que lleva a otra parte, no hace nada más.
``js
export const defaultNavigation: FuseNavigationItem[] = [
    {
        {
            id   : 'apps.academy',
            title: 'Academy',
            type : 'basic',
            icon : 'heroicons_outline:academic-cap',
            link : '/apps/academy'
        },
        
    }
];
``
- collapsable: Es un subitem de un menú aside que despliega subitems
``js
export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'user-interface',
        title   : 'UI',
        tooltip : 'UI',
        type    : 'aside',
        icon    : 'heroicons_outline:collection',
        children: [
           {
                id      : 'apps.ecommerce',
                title   : 'ECommerce',
                type    : 'collapsable',
                icon    : 'heroicons_outline:shopping-cart',
                children: [
                    {
                        id   : 'apps.ecommerce.inventory',
                        title: 'Inventory',
                        type : 'basic',
                        link : '/apps/ecommerce/inventory'
                    }
                ]
            },
        ]
    }
];
``
- divider: actúa como un divisor de menú, no hace nada, en este caso solo necesita un id y el tipo.
``js
export const defaultNavigation: FuseNavigationItem[] = [
    {
        id  : 'divider-1',
        type: 'divider'
    },
];
``
- group: Tiene una funcionalidad similar que aside
``js
export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'apps',
        title   : 'Applications',
        subtitle: 'Custom made application designs',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'apps.academy',
                title: 'Academy',
                type : 'basic',
                icon : 'heroicons_outline:academic-cap',
                link : '/apps/academy'
            }
        ]
    },
];
``

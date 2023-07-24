/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'home',
        title: 'Home',
        tooltip: 'Inicio',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/admin',
    },
    {
        id: 'gestion',
        title: 'Gestion Clientes',
        tooltip: 'Gestion Clientes',
        type: 'aside',
        icon: 'heroicons_outline:identification',
        children: [
            {
                id: 'clientes',
                title: 'Clientes',
                tooltip: 'Clientes',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/gestion/clientes',
            },
            {
                id: 'payments',
                title: 'Cuentas Clientes Juridicos',
                tooltip: 'Cuenta',
                type: 'basic',
                icon: 'heroicons_outline:currency-dollar',
                link: '/gestion/gestion-juridicos/accounts',
            },
            // {
            //     id      : 'history',
            //     title   : 'Historial de transancciones',
            //     tooltip : 'Historial de transacciones',
            //     type    : 'basic',
            //     icon    : 'heroicons_outline:document-text',
            //     //link    : '/account-history'
            // }
        ],
    },
    {
        id: 'gestion-admin',
        title: 'Gestion Administrativa',
        tooltip: 'Gestion Administrativa',
        type: 'aside',
        icon: 'heroicons_outline:chart-pie',
        children: [
            {
                id: 'agencias',
                title: 'Agencias',
                tooltip: 'Agencias',
                type: 'basic',
                icon: 'heroicons_outline:office-building',
                link: '/admin/agency',
            },
            {
                id: 'estructura',
                title: 'Estructura Geográfica',
                tooltip: 'Estructura Geográfica',
                type: 'basic',
                icon: 'heroicons_outline:globe',
                link: '/admin/geostructure',
            },
            {
                id: 'locacion',
                title: 'Localizaciones',
                tooltip: 'Localizaciones',
                type: 'basic',
                icon: 'heroicons_outline:location-marker',
                link: '/admin/location',
            },
            {
                id: 'feriados',
                title: 'Feriados',
                tooltip: 'Feriados',
                type: 'basic',
                icon: 'heroicons_outline:calendar',
                link: '/gestion/gestion-juridicos/accounts',
            },
            // {
            //     id      : 'history',
            //     title   : 'Historial de transancciones',
            //     tooltip : 'Historial de transacciones',
            //     type    : 'basic',
            //     icon    : 'heroicons_outline:document-text',
            //     //link    : '/account-history'
            // }
        ],
    },
    // {
    //     id: 'pages',
    //     title: 'Pages',
    //     tooltip: 'Pages',
    //     type: 'aside',
    //     icon: 'heroicons_outline:document-duplicate',
    //     children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    // {
    //     id: 'user-interface',
    //     title: 'UI',
    //     tooltip: 'UI',
    //     type: 'aside',
    //     icon: 'heroicons_outline:collection',
    //     children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    {
        id: 'navigation-features',
        title: 'Navigation',
        tooltip: 'Navigation',
        type: 'aside',
        icon: 'heroicons_outline:menu',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];

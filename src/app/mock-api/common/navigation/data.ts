/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id      : 'home',
        title   : 'Home',
        tooltip : 'Inicio',
        type    : 'basic',
        icon    : 'heroicons_outline:home',
        link    : '/gestion'
    },
    {
        id      : 'gestion',
        title   : 'Gestion',
        tooltip : 'Gestion',
        type    : 'aside',
        icon    : 'heroicons_outline:identification',
        children: [
            {
                id      : 'clientes',
                title   : 'Clientes',
                tooltip : 'Clientes',
                type    : 'basic',
                icon    : 'heroicons_outline:users',
                link    : '/gestion/clientes'
            },
            {
                id      : 'payments',
                title   : 'Pagos',
                tooltip : 'Pagos',
                type    : 'basic',
                icon    : 'heroicons_outline:currency-dollar',
                //link    : '/account-operations'
            },
            // {
            //     id      : 'history',
            //     title   : 'Historial de transancciones',
            //     tooltip : 'Historial de transacciones',
            //     type    : 'basic',
            //     icon    : 'heroicons_outline:document-text',
            //     //link    : '/account-history'
            // }
        ]
    },
    {
        id      : 'pages',
        title   : 'Pages',
        tooltip : 'Pages',
        type    : 'aside',
        icon    : 'heroicons_outline:document-duplicate',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'user-interface',
        title   : 'UI',
        tooltip : 'UI',
        type    : 'aside',
        icon    : 'heroicons_outline:collection',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'navigation-features',
        title   : 'Navigation',
        tooltip : 'Navigation',
        type    : 'aside',
        icon    : 'heroicons_outline:menu',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];

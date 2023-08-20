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
        id: 'Gestion geostructure',
        title: 'Gestion Geostructure',
        tooltip: 'Gestion geostructure',
        type: 'basic',
        icon: 'heroicons_outline:globe',
        link: '/admin/geostructure',
    },
    {
        id: 'Gestion Clientes',
        title: 'Gestion Clientes',
        tooltip: 'Gestion Clientes',
        type: 'basic',
        icon: 'heroicons_outline:users',
        link: '/admin/gestion',
    },
    {
        id: 'Gestion Agencias',
        title: 'Gestion Agencias',
        tooltip: 'Gestion Agencias',
        type: 'basic',
        icon: 'heroicons_outline:office-building',
        link: '/admin/agency',
    },
    {
        id: 'Gestion Locaciones',
        title: 'Gestion Locaciones',
        tooltip: 'Gestion Locaciones',
        type: 'basic',
        icon: 'heroicons_outline:location-marker',
        link: '/admin/location',
    },
    {
        id: 'Gestion Feriados',
        title: 'Gestion Feriados',
        tooltip: 'Gestion Feriados',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-list',
        link: '/admin/holiday',
    },

    {
        id: 'user-interface',
        title: 'UI',
        tooltip: 'UI',
        type: 'aside',
        icon: 'heroicons_outline:collection',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
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

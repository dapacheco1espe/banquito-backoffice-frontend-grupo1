import { Component, OnInit } from '@angular/core';
import { LocationService } from 'app/services/location.service';
import Swal from 'sweetalert2';
import { GeostructureService } from '../../../services/geostructure.service';
import {
    Geostructure,
    GeostructureLevel,
} from '../geostructure/geostructure-model/geostructure';
import { Location } from './location-model/location';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
    locations: Location[] = [];
    filteredLocations: Location[] = [];
    searchTerm: string = '';
    selectedRowIndex: number = -1;
    showButtons: boolean = false;
    showNav: boolean = false;
    currentPage: number = 1;
    pageSize: number = 5;

    paises: Geostructure[] = [];
    levels: GeostructureLevel[] = [];

    selectedPais: string = '';
    selectedLevel: string = '';

    constructor(
        private geostructureService: GeostructureService,
        private locationService: LocationService
    ) {}

    ngOnInit(): void {
        this.getGeostructures();
    }

    getGeostructures(): void {
        this.geostructureService.list().subscribe((data) => {
            //(data);
            this.paises = data;
            //(this.paises);
            //(this.paises.length);
        });
    }

    onSelectPais(pais: string) {
        this.locations = [];
        //(pais);
        this.selectedPais = pais;
        this.selectedLevel = '';
        this.getLevelsPorPais(pais);
    }

    onSelectLevel(level: any) {
        this.locationService
            .list(this.selectedPais, level)
            .subscribe((data) => {
                //(data);
                this.locations = data;
                //(this.locations);
            });
    }

    getLevelsPorPais(pais: string): void {
        this.geostructureService
            .getGeostructureByCode(pais)
            .subscribe((data) => {
                //('getLevelsPorPais', data.geoStructures);
                this.levels = data.geoStructures;
                //('this.levels', this.levels);
            });
    }

    filterData() {
        this.filteredLocations = this.locations.filter(
            (item) =>
                item.countryCode
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase()) ||
                item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.showButtons = false;
    }

    get displayedData(): any[] {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.locations
            .filter(
                (item) =>
                    item.countryCode
                        .toLowerCase()
                        .includes(this.searchTerm.toLowerCase()) ||
                    item.name
                        .toLowerCase()
                        .includes(this.searchTerm.toLowerCase())
            )
            .slice(startIndex, endIndex);
    }

    setCurrentPage(page: number) {
        this.currentPage = page;
    }

    rowClick(index: number) {
        this.selectedRowIndex = index;
        this.showButtons = true;
        //(this.selectedRowIndex);
    }

    resetSelection() {
        this.selectedRowIndex = -1;
        this.showButtons = false;
    }

    mostrarAdvertencia(code: any) {
        // Utilizamos SweetAlert para mostrar la alerta
        Swal.fire({
            title: 'Advertencia',
            text: 'Esta acción inactivará el registro. ¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                this.locationService.delete(code).subscribe(
                    (response) => {
                        //('Respuesta exitosa:', response);
                        Swal.fire(
                            'Listo',
                            'El registro ha sido deshabilitado',
                            'success'
                        ).then(() => {});
                    },
                    (err) => {
                        console.error('Error en la solicitud:', err);
                        Swal.fire({
                            title: 'Error',
                            text: 'Hubo un error al ejecutar la transacción',
                            icon: 'error',
                        });
                    }
                );
            }
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AgencyService } from 'app/services/agency.service';
import Swal from 'sweetalert2';
import { Geolocation } from '../geostructure/geostructure-model/geolocation';
import { Agency } from './agency-model/agency';

@Component({
    selector: 'app-agency',
    templateUrl: './agency.component.html',
    styleUrls: ['./agency.component.scss'],
    animations: fuseAnimations,
})
export class AgencyComponent implements OnInit {
    agencies: Agency[] = [];
    filteredAgencies: Agency[] = [];
    searchTerm: string = '';
    selectedRowIndex: number = -1;
    showButtons: boolean = false;
    showNav: boolean = false;
    currentPage: number = 1;
    pageSize: number = 5;

    provincias: Geolocation[] = [];
    cantones: Geolocation[] = [];
    parroquias: Geolocation[] = [];

    selectedProvincia: string = '';
    selectedCanton: string = '';
    selectedParroquia: string = '';

    showSearch: boolean = false;

    constructor(private agencyService: AgencyService, private router: Router) {}

    ngOnInit(): void {
        //this.getAgencies();
        this.getProvincias();
    }

    // Traer agencias existentes
    getAgencies(parroquia: any): void {
        this.agencyService.list(parroquia).subscribe((data) => {
            //(data);
            this.agencies = data;
            //(this.agencies);
            this.showSearch = true;
        });
    }

    // Filtrar datos, funcion para input de busqueda
    filterData() {
        this.filteredAgencies = this.agencies.filter(
            (item) =>
                item.name
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase()) ||
                item.emailAddress
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase()) ||
                item.phoneNumber
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase()) ||
                item.line1
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase()) ||
                item.line2.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.showButtons = false;
    }

    // Datos desplegados
    get displayedData(): Agency[] {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.agencies
            .filter(
                (item) =>
                    item.name
                        .toLowerCase()
                        .includes(this.searchTerm.toLowerCase()) ||
                    item.emailAddress
                        .toLowerCase()
                        .includes(this.searchTerm.toLowerCase()) ||
                    item.phoneNumber
                        .toLowerCase()
                        .includes(this.searchTerm.toLowerCase()) ||
                    item.line1
                        .toLowerCase()
                        .includes(this.searchTerm.toLowerCase()) ||
                    item.line2
                        .toLowerCase()
                        .includes(this.searchTerm.toLowerCase())
            )
            .slice(startIndex, endIndex);
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

    get totalPages(): number[] {
        //(
            Array(Math.ceil(this.agencies.length / this.pageSize))
                .fill(0)
                .map((_, i) => i + 1)
        );

        return Array(Math.ceil(this.agencies.length / this.pageSize))
            .fill(0)
            .map((_, i) => i + 1);
    }

    setCurrentPage(page: number) {
        this.currentPage = page;
    }

    onSelectProvincia(provincia: string) {
        this.showSearch = false;
        //(provincia);
        this.selectedProvincia = provincia;
        this.selectedCanton = '';
        this.selectedParroquia = '';
        this.parroquias = [];
        this.getCantonesPorProvincia(provincia);
    }

    onSelectCanton(canton: string) {
        this.showSearch = false;
        this.selectedCanton = canton;
        this.selectedParroquia = '';
        this.getParroquiasPorCanton(canton);
    }

    onSelectParroquia(parroquia: any) {
        this.selectedParroquia = parroquia;
        //(parroquia);
        this.getAgencies(parroquia);
    }

    getProvincias(): void {
        this.agencyService.listProv().subscribe((data) => {
            //(data);
            this.provincias = data;
            //(this.provincias);
        });
    }

    getCantonesPorProvincia(provincia: string): void {
        this.agencyService.listCant(provincia).subscribe((data) => {
            //(data);
            this.cantones = data;
            //(this.cantones);
        });
    }

    getParroquiasPorCanton(canton: string): void {
        this.agencyService.listParr(canton).subscribe((data) => {
            //(data);
            this.parroquias = data;
            //(this.parroquias);
        });
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
                this.agencyService.delete(code).subscribe(
                    (data) => {
                        Swal.fire(
                            'Listo',
                            'El registro ha sido deshabilitado',
                            'success'
                        ).then(() => {
                            this.router.navigate(['/admin/agency']);
                        });
                    },
                    (err) => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Hubo un error al ejecutra la transacción',
                            icon: 'error',
                        });
                    }
                );
            }
        });
    }
}

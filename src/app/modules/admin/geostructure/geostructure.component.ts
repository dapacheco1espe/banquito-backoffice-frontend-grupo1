import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { GeostructureService } from 'app/services/geostructure.service';
import Swal from 'sweetalert2';
import { Geostructure } from './geostructure-model/geostructure';

@Component({
    selector: 'app-geostructure',
    templateUrl: './geostructure.component.html',
    styleUrls: ['./geostructure.component.scss'],
    animations: fuseAnimations,
})
export class GeostructureComponent implements OnInit {
    geostructures: Geostructure[] = [];
    filteredGeostructure: Geostructure[] = [];
    searchTerm: string = '';
    selectedRowIndex: number = -1;
    showButtons: boolean = false;
    showNav: boolean = false;
    currentPage: number = 1;
    pageSize: number = 5;

    constructor(
        private geostructureService: GeostructureService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getGeostructures();
    }

    // Traer agencias existentes
    getGeostructures(): void {
        this.geostructureService.list().subscribe((data) => {
            console.log(data);
            this.geostructures = data;
            console.log(this.geostructures);
            console.log(this.geostructures.length);
        });
    }

    filterData() {
        this.filteredGeostructure = this.geostructures.filter(
            (item) =>
                item.countryCode
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase()) ||
                item.name
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase()) ||
                item.phoneCode
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase())
        );
        this.showButtons = false;
    }

    get displayedData(): any[] {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.geostructures
            .filter(
                (item) =>
                    item.countryCode
                        .toLowerCase()
                        .includes(this.searchTerm.toLowerCase()) ||
                    item.name
                        .toLowerCase()
                        .includes(this.searchTerm.toLowerCase()) ||
                    item.phoneCode
                        .toLowerCase()
                        .includes(this.searchTerm.toLowerCase())
            )
            .slice(startIndex, endIndex);
    }

    get totalPages(): number[] {
        return Array(Math.ceil(this.geostructures.length / this.pageSize))
            .fill(0)
            .map((_, i) => i + 1);
    }

    setCurrentPage(page: number) {
        this.currentPage = page;
    }

    rowClick(index: number) {
        this.selectedRowIndex = index;
        this.showButtons = true;
        console.log(this.selectedRowIndex);
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
                this.geostructureService.delete(code).subscribe(
                    (data) => {
                        Swal.fire(
                            'Listo',
                            'El registro ha sido deshabilitado',
                            'success'
                        ).then(() => {
                            this.router.navigate(['/admin/geostructure']);
                        });
                    },
                    (err) => {
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

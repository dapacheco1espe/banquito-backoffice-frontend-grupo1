import { Component, OnInit } from '@angular/core';
import { AgencyService } from 'app/services/agency.service';
import { fuseAnimations } from '@fuse/animations';
import Swal from 'sweetalert2';
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

    provincias: string[] = ['Provincia 1', 'Provincia 2', 'Provincia 3'];
    cantones: string[] = [];
    parroquias: string[] = [];

    selectedProvincia: string = '';
    selectedCanton: string = '';
    selectedParroquia: string = '';

    constructor(
        private service: AgencyService,
        private agencyService: AgencyService
    ) {}

    ngOnInit(): void {
        this.getAgencies();
    }

    // Traer agencias existentes
    getAgencies(): void {
        this.agencyService.list().subscribe((data) => {
            console.log(data);
            this.agencies = data;
            console.log(this.agencies);
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
        console.log(this.selectedRowIndex);
    }

    resetSelection() {
        this.selectedRowIndex = -1;
        this.showButtons = false;
    }

    get totalPages(): number[] {
        console.log(
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
        this.selectedProvincia = provincia;
        this.selectedCanton = '';
        this.selectedParroquia = '';
        this.cantones = this.getCantonesPorProvincia(provincia);
        this.parroquias = [];
    }

    onSelectCanton(canton: string) {
        this.selectedCanton = canton;
        this.selectedParroquia = '';
        this.parroquias = this.getParroquiasPorCanton(canton);
    }

    onSelectParroquia(parroquia: string) {
        this.selectedParroquia = parroquia;
    }

    getCantonesPorProvincia(provincia: string): string[] {
        // Aquí debes implementar la lógica para obtener los cantones según la provincia seleccionada
        // Puedes hacer una llamada a tu servicio o cargar los datos desde un arreglo o una base de datos
        // Devuelve un arreglo con los cantones correspondientes
        // Ejemplo de implementación:
        if (provincia === 'Provincia 1') {
            return ['Cantón 1.1', 'Cantón 1.2', 'Cantón 1.3'];
        } else if (provincia === 'Provincia 2') {
            return ['Cantón 2.1', 'Cantón 2.2', 'Cantón 2.3'];
        } else if (provincia === 'Provincia 3') {
            return ['Cantón 3.1', 'Cantón 3.2', 'Cantón 3.3'];
        }
        return [];
    }

    getParroquiasPorCanton(canton: string): string[] {
        // Aquí debes implementar la lógica para obtener las parroquias según el cantón seleccionado
        // Puedes hacer una llamada a tu servicio o cargar los datos desde un arreglo o una base de datos
        // Devuelve un arreglo con las parroquias correspondientes
        // Ejemplo de implementación:
        if (canton === 'Cantón 1.1') {
            return ['Parroquia 1.1.1', 'Parroquia 1.1.2', 'Parroquia 1.1.3'];
        } else if (canton === 'Cantón 2.1') {
            return ['Parroquia 2.1.1', 'Parroquia 2.1.2', 'Parroquia 2.1.3'];
        } else if (canton === 'Cantón 3.1') {
            return ['Parroquia 3.1.1', 'Parroquia 3.1.2', 'Parroquia 3.1.3'];
        }
        return [];
    }
}

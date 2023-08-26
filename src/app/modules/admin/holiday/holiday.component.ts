import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import Swal from 'sweetalert2';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
    FormGroup,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { GeostructureService } from 'app/services/geostructure.service';
import {
    Geostructure,
    GeostructureLevel,
} from '../geostructure/geostructure-model/geostructure';
import { Holiday } from './holiday-model/holiday';
import { HolidayService } from '../../../services/holiday.service';

@Component({
    selector: 'app-holiday',
    templateUrl: './holiday.component.html',
    styleUrls: ['./holiday.component.scss'],
    animations: fuseAnimations,
})
export class HolidayComponent implements OnInit {
    holidays: Holiday[] = [];
    searchTerm: string = '';
    selectedPais: string = '';
    filteredHolidays: Holiday[] = [];
    selectedRowIndex: number = -1;
    showButtons: boolean = false;
    showNav: boolean = false;
    currentPage: number = 1;
    pageSize: number = 5;
    startDate: any;
    endDate: any;

    paises: Geostructure[] = [];

    constructor(
        private geostructureService: GeostructureService,
        private HolidayService: HolidayService
    ) {}

    ngOnInit(): void {
        this.getGeostructures();

        this.range.controls.start.valueChanges.subscribe((startDate) => {
            // Función a ejecutar cuando cambia la fecha de inicio
            console.log('Fecha de inicio cambiada:', startDate);
            // Llamar a la función que deseas ejecutar aquí
            this.startDate = startDate;
        });

        this.range.controls.end.valueChanges.subscribe((endDate) => {
            // Función a ejecutar cuando cambia la fecha de fin
            console.log('Fecha de fin cambiada:', endDate);
            // Llamar a la función que deseas ejecutar aquí
            this.endDate = endDate;
            this.filterData();
        });
    }

    getGeostructures(): void {
        this.geostructureService.list().subscribe((data) => {
            console.log(data);
            this.paises = data;
            console.log(this.paises);
            console.log(this.paises.length);
        });
    }

    onSelectPais(pais: string) {
        console.log(pais);
        this.selectedPais = pais;
        this.getHolidays(pais);
    }

    range = new FormGroup({
        start: new FormControl(null),
        end: new FormControl(null),
    });

    getHolidays(paisId: any): void {
        this.HolidayService.list(paisId).subscribe((data) => {
            console.log(data);
            this.holidays = data;
            console.log(this.holidays);
        });
    }

    // Filtrar datos, funcion para input de busqueda
    filterData() {
        this.filteredHolidays = this.holidays.filter((item) => {
            const holidayDate = new Date(item.holidayDate);
            const isDateInRange =
                holidayDate >= this.startDate && holidayDate <= this.endDate;
            const isNameMatch = item.name
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase());

            return isDateInRange && isNameMatch;
        });
        this.showButtons = false;
    }

    //Datos desplegados
    get displayedData(): Holiday[] {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.holidays
            .filter((item) => {
                const holidayDate = new Date(item.holidayDate);
                const isDateInRange =
                    holidayDate >= this.startDate &&
                    holidayDate <= this.endDate;
                const isNameMatch = item.name
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase());

                return isDateInRange && isNameMatch;
            })
            .slice(startIndex, endIndex);
    }
}

import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup
} from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { GeostructureService } from 'app/services/geostructure.service';
import Swal from 'sweetalert2';
import { HolidayService } from '../../../services/holiday.service';
import {
    Geostructure
} from '../geostructure/geostructure-model/geostructure';
import { Holiday } from './holiday-model/holiday';

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
    selectedPaisWeekend: string = '';
    filteredHolidays: Holiday[] = [];
    selectedRowIndex: number = -1;
    showButtons: boolean = false;
    showNav: boolean = false;
    currentPage: number = 1;
    pageSize: number = 5;
    startDate: any;
    endDate: any;

    paises: Geostructure[] = [];

    isModalOpen: boolean = false;
    yearOptions: number[] = [];
    selectedYear: number;
    monthOptions: { name: string; value: number }[] = [];
    selectedMonth: number;
    saturday: boolean = false;
    sunday: boolean = false;

    constructor(
        private geostructureService: GeostructureService,
        private HolidayService: HolidayService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.generateYearOptions();
        this.generateMonthOptions();
        this.getGeostructures();

        this.range.controls.start.valueChanges.subscribe((startDate) => {
            // Función a ejecutar cuando cambia la fecha de inicio
            //('Fecha de inicio cambiada:', startDate);
            // Llamar a la función que deseas ejecutar aquí
            this.startDate = startDate;
        });

        this.range.controls.end.valueChanges.subscribe((endDate) => {
            // Función a ejecutar cuando cambia la fecha de fin
            //('Fecha de fin cambiada:', endDate);
            // Llamar a la función que deseas ejecutar aquí
            this.endDate = endDate;
            this.filterData();
        });
    }

    generateYearOptions() {
        const currentYear = new Date().getFullYear();
        const startYear = 2000; // Puedes ajustar este valor según tus necesidades

        for (let year = currentYear; year >= startYear; year--) {
            this.yearOptions.push(year);
        }

        this.selectedYear = currentYear; // Opcional: Establece un valor predeterminado
    }

    generateMonthOptions() {
        const monthNames = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ];

        for (let month = 1; month <= 12; month++) {
            this.monthOptions.push({
                name: monthNames[month - 1],
                value: month,
            });
        }

        const currentMonth = new Date().getMonth() + 1; // +1 porque los meses comienzan en 0
        this.selectedMonth = currentMonth; // Opcional: Establece un valor predeterminado
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
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
        //(pais);
        this.holidays = [];
        this.selectedPais = pais;
        this.getHolidays(pais);
    }

    onSelectMonth(month: number) {
        //(month);
        this.selectedMonth = month;
    }

    range = new FormGroup({
        start: new FormControl(null),
        end: new FormControl(null),
    });

    getHolidays(paisId: any): void {
        this.HolidayService.list(paisId).subscribe((data) => {
            //(data);
            this.holidays = data;
            //(this.holidays);
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

    onCreate() {
        //('onCreate');

        const monthVal = this.monthOptions.find(
            (month) => month.value === Number(this.selectedMonth)
        );

        //('month', monthVal);

        Swal.fire({
            title: 'Advertencia',
            text:
                'Se crearán los feriados de ' +
                monthVal.name +
                ' del año ' +
                this.selectedYear,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#dc2626',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                if (
                    (!this.saturday && !this.sunday) ||
                    !this.selectedPaisWeekend
                ) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Datos incorrectos, vuele a intentarlo',
                        icon: 'error',
                    });
                } else {
                    const weekendaArr = {
                        selectedPaisWeekend: this.selectedPaisWeekend,
                        selectedYear: this.selectedYear,
                        selectedMonth: this.selectedMonth,
                        saturday: '' + this.saturday,
                        sunday: '' + this.sunday,
                    };

                    //('weekendaArr', weekendaArr);

                    this.HolidayService.generateWeekends(
                        this.selectedPaisWeekend,
                        this.selectedYear,
                        this.selectedMonth,
                        this.saturday,
                        this.sunday
                    ).subscribe(
                        (data) => {
                            Swal.fire(
                                'Listo',
                                'Se han creado los registros de fin de semana del mes ' +
                                    monthVal.name +
                                    ' del año ' +
                                    this.selectedYear,
                                'success'
                            ).then(() => {
                                window.location.reload();
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
            }
        });
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

    mostrarAdvertencia(code: any) {
        // Utilizamos SweetAlert para mostrar la alerta
        //(code);
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
                this.HolidayService.delete(code).subscribe(
                    (data) => {
                        Swal.fire(
                            'Listo',
                            'El registro ha sido deshabilitado',
                            'success'
                        ).then(() => {
                            window.location.reload();
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

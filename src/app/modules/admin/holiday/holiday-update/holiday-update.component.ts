import { Component, OnInit } from '@angular/core';
import { GeostructureService } from 'app/services/geostructure.service';
import {
    Geostructure,
    GeostructureLevel,
} from '../../geostructure/geostructure-model/geostructure';
import Swal from 'sweetalert2';
import { LocationService } from 'app/services/location.service';
import { HolidayService } from 'app/services/holiday.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-holiday-update',
    templateUrl: './holiday-update.component.html',
    styleUrls: ['./holiday-update.component.scss'],
})
export class HolidayUpdateComponent implements OnInit {
    dataUrl: any = {};

    holidayDate: Date;
    countryCode: string;
    geoLocationId: string;
    name: string;
    type: string;

    selectedDate: Date;
    selectedPais: string;
    selectedType: string;
    selectedLevel: string;
    selectedElement: string;

    paises: Geostructure[] = [];
    types: string[] = ['Nacional', 'Regional'];
    levels: GeostructureLevel[] = [];
    elements: any[] = [];
    choiceLocation: boolean = false;

    isSaved: boolean | null = null;
    errorMessage: string | null = null;

    constructor(
        private geostructureService: GeostructureService,
        private locationService: LocationService,
        private holidayService: HolidayService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.getGeostructures();
        this.getDetail();
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
    }

    onSelectType(type: string) {
        this.geoLocationId = null;
        console.log(type);
        this.selectedType = type;
        if (this.selectedType === 'Regional') {
            this.choiceLocation = true;
            this.getLevelsPorPais(this.selectedPais);
        } else {
            this.choiceLocation = false;
        }
    }

    getLevelsPorPais(pais: string): void {
        this.geostructureService
            .getGeostructureByCode(pais)
            .subscribe((data) => {
                console.log('getLevelsPorPais', data.geoStructures);
                this.levels = data.geoStructures;
                console.log('this.levels', this.levels);
            });
    }

    onSelectLevel(level: any) {
        this.elements = [];
        console.log('level', level);
        this.locationService
            .list(this.selectedPais, level.levelCode)
            .subscribe((data) => {
                console.log('pronz', data);
                this.elements = data;
                console.log(this.elements);
            });
    }

    onSelectElement(element: any) {
        console.log('element', element);
        this.geoLocationId = element;
    }

    validateForm(): boolean {
        if (
            !this.holidayDate ||
            !this.countryCode ||
            !this.name ||
            !this.type
        ) {
            console.log('if');
            this.errorMessage = 'Por favor, completa todos los campos.';
            return false;
        }

        // Validar el formato de los campos
        // Codigo de Pais segun
        // if (!/^[A-Z]{3}$/.test(this.countryCode)) {
        //     this.errorMessage =
        //         'El codigo SWIFT debe seguir el formato estandar';
        //     console.log('ECU Alfa');
        //     return false;
        // }
        // Codigo Telefónico
        // if (!/^\d{1,2}$/.test(this.areaPhoneCode)) {
        //     this.errorMessage = 'El email debe tener un estructura estándar';
        //     console.log('Codigo');
        //     return false;
        // }
        // this.errorMessage = null;
        return true;
    }

    getDetail(): void {
        const uuid = this.activatedRoute.snapshot.params.uuid;
        this.holidayService.detail(uuid).subscribe(
            (data) => {
                console.log('getDetail update', data);
                this.dataUrl = data;
                this.holidayDate = this.dataUrl.holidayDate;
                this.countryCode = this.dataUrl.countryCode;
                this.geoLocationId = this.dataUrl.geoLocationId;
                this.name = this.dataUrl.name;
                this.type = this.dataUrl.type;
            },
            (err) => {
                console.log('No encuentra NADA');
                this.router.navigate(['']);
            }
        );
    }

    onUpdate() {
        console.log('onUpdate()');
        if (!this.validateForm()) {
            Swal.fire({
                title: 'Error',
                text: 'Error, datos incorrectos. Por favor, revise e intente nuevamente.',
                icon: 'error',
            });
            return;
        }

        if (!this.geoLocationId) {
            this.geoLocationId = null;
        }

        const anyHoliday = {
            holidayDate: this.holidayDate,
            countryCode: this.countryCode,
            geoLocationId: this.geoLocationId,
            name: this.name,
            type: this.type,
        };

        console.log(anyHoliday);
        const uuid = this.activatedRoute.snapshot.params.uuid;
        this.holidayService.update(uuid, anyHoliday).subscribe(
            (data) => {
                console.log('Hola');
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'El feriado se ha actualizado correctamente.',
                    icon: 'success',
                }).then(() => {
                    this.isSaved = true;
                    this.errorMessage = null;
                    // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
                    this.router.navigate(['/admin/holiday']);
                });
            },
            (err) => {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al guardar feriado. Por favor, inténtalo nuevamente.',
                    icon: 'error',
                });
                this.isSaved = false;
                this.errorMessage =
                    'Error al guardar la feriado. Por favor, inténtalo nuevamente.';
            }
        );

        // this.holidayService.create(anyHoliday).subscribe(
        //     (data) => {
        //         console.log('Hola');
        //         Swal.fire({
        //             title: '¡Éxito!',
        //             text: 'La nueva localización se ha guardado correctamente.',
        //             icon: 'success',
        //         }).then(() => {
        //             this.isSaved = true;
        //             this.errorMessage = null;
        //             // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
        //             this.router.navigate(['/admin/holiday']);
        //         });
        //     },
        //     (err) => {
        //         Swal.fire({
        //             title: 'Error',
        //             text: 'Error al guardar localización. Por favor, inténtalo nuevamente.',
        //             icon: 'error',
        //         });
        //         this.isSaved = false;
        //         this.errorMessage =
        //             'Error al guardar la localización. Por favor, inténtalo nuevamente.';
        //     }
        // );
    }
}

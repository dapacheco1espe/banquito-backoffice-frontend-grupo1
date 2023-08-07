import { Component, OnInit } from '@angular/core';
import { GeostructureService } from 'app/services/geostructure.service';
import {
    Geostructure,
    GeostructureLevel,
} from '../../geostructure/geostructure-model/geostructure';
import Swal from 'sweetalert2';
import { LocationService } from 'app/services/location.service';

@Component({
    selector: 'app-location-create',
    templateUrl: './location-create.component.html',
    styleUrls: ['./location-create.component.scss'],
})
export class LocationCreateComponent implements OnInit {
    countryCode!: string;
    levelParentId!: number;
    levelParentName!: string;
    levelCode!: number;
    levelName!: string;
    name!: string;
    areaPhoneCode!: string;
    zipCode!: string;

    paises: Geostructure[] = [];
    levels: GeostructureLevel[] = [];
    elements: any[] = [];

    selectedPais: string = '';
    selectedLevel: number = 0;
    selectedElement: string = '';

    isSaved: boolean | null = null;
    errorMessage: string | null = null;

    constructor(
        private geostructureService: GeostructureService,
        private locationService: LocationService
    ) {}

    ngOnInit(): void {
        this.getGeostructures();
    }

    getGeostructures(): void {
        this.geostructureService.list().subscribe((data) => {
            console.log(data);
            this.paises = data;
            console.log(this.paises);
            console.log(this.paises.length);
        });
    }

    onCreate() {
        console.log('onCreate()');
        if (!this.validateForm()) {
            Swal.fire({
                title: 'Error',
                text: 'Error, datos incorrectos. Por favor, revise e intente nuevamente.',
                icon: 'error',
            });
            return;
        }

        const anyLocation = {
            countryCode: this.selectedPais,
            levelParentId: this.selectedLevel,
            levelParentName: this.selectedElement,
            levelCode: this.selectedLevel,
            levelName: 'parroquia',
            name: this.name,
            areaPhoneCode: this.areaPhoneCode,
            zipCode: this.zipCode,
        };

        console.log(anyLocation);
    }

    onSelectPais(pais: string) {
        console.log(pais);
        this.selectedPais = pais;
        this.countryCode = this.selectedPais;
        this.getLevelsPorPais(pais);
    }

    onSelectLevel(level: any) {
        this.selectedLevel = null;
        this.elements = [];
        console.log('level', level);
        this.selectedLevel = level - 1;
        console.log('selectedLevel', this.selectedLevel);
        if (this.selectedLevel > 0) {
            this.locationService
                .list(this.selectedPais, this.selectedLevel)
                .subscribe((data) => {
                    console.log('pronz', data);
                    this.elements = data;
                    console.log(this.elements);
                });
        }
    }

    onSelectElement(element: any) {
        console.log('element', element);
        this.getElementProperties(element);
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

    getElementProperties(elementUuid: any) {
        this.geostructureService.getGeoById(elementUuid).subscribe((data) => {
            console.log('data getGeoById', data);
        });
    }

    validateForm(): boolean {
        if (
            !this.countryCode ||
            !this.levelParentId ||
            !this.levelParentName ||
            !this.levelCode ||
            !this.levelName ||
            !this.name ||
            !this.areaPhoneCode ||
            !this.zipCode
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
}

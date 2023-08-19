import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeostructureService } from 'app/services/geostructure.service';
import { LocationService } from 'app/services/location.service';
import Swal from 'sweetalert2';
import {
    Geostructure,
    GeostructureLevel,
} from '../../geostructure/geostructure-model/geostructure';

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

    highLevel: Boolean;

    selectedPais: string = '';
    selectedLevel: number = 0;
    parentLevel: number = 0;
    selectedElement: string = '';

    isSaved: boolean | null = null;
    errorMessage: string | null = null;

    constructor(
        private geostructureService: GeostructureService,
        private locationService: LocationService,
        private router: Router
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
            levelParentId: this.levelParentId,
            levelParentName: this.levelParentName,
            levelCode: this.levelCode,
            levelName: this.levelName,
            name: this.name,
            areaPhoneCode: this.areaPhoneCode,
            zipCode: this.zipCode,
        };

        //console.log(anyLocation);

        this.locationService.create(anyLocation).subscribe(
            (data) => {
                console.log('Hola');
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'La nueva localización se ha guardado correctamente.',
                    icon: 'success',
                }).then(() => {
                    this.isSaved = true;
                    this.errorMessage = null;
                    // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
                    this.router.navigate(['/admin/location']);
                });
            },
            (err) => {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al guardar localización. Por favor, inténtalo nuevamente.',
                    icon: 'error',
                });
                this.isSaved = false;
                this.errorMessage =
                    'Error al guardar la localización. Por favor, inténtalo nuevamente.';
            }
        );
    }

    onSelectPais(pais: string) {
        console.log(pais);
        this.selectedPais = pais;
        this.countryCode = this.selectedPais;
        this.getLevelsPorPais(pais);
    }

    onSelectLevel(level: any) {
        //this.selectedLevel = null;
        this.elements = [];
        console.log('level', level);
        this.levelCode = level.levelCode;
        this.levelName = level.name;
        this.parentLevel = this.levelCode - 1;
        console.log('parentLevel', this.parentLevel);
        if (this.parentLevel > 0) {
            this.highLevel = false;
            this.locationService
                .list(this.selectedPais, this.parentLevel)
                .subscribe((data) => {
                    console.log('pronz', data);
                    this.elements = data;
                    console.log(this.elements);
                });
        } else if (this.parentLevel === 0) {
            this.highLevel = true;
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
            this.levelParentId = this.parentLevel;
            this.levelParentName = data.name;
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

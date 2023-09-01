import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeostructureService } from 'app/services/geostructure.service';
import { LocationService } from 'app/services/location.service';
import Swal from 'sweetalert2';
import {
    Geostructure,
    GeostructureLevel,
} from '../../geostructure/geostructure-model/geostructure';

@Component({
    selector: 'app-location-update',
    templateUrl: './location-update.component.html',
    styleUrls: ['./location-update.component.scss'],
})
export class LocationUpdateComponent implements OnInit {
    dataUrl: any = {};

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
    selectedLevelObj: GeostructureLevel = { levelCode: 0, name: '' };

    isSaved: boolean | null = null;
    errorMessage: string | null = null;

    constructor(
        private geostructureService: GeostructureService,
        private locationService: LocationService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.getGeostructures();
        this.getDetail();
    }

    getGeostructures(): void {
        this.geostructureService.list().subscribe((data) => {
            //(data);
            this.paises = data;
            //(this.paises);
            //(this.paises.length);
        });
    }

    getLevelsPorPais(pais: string): void {
        this.geostructureService
            .getGeostructureByCode(pais)
            .subscribe((data) => {
                //('getLevelsPorPais', data.geoStructures);
                this.levels = data.geoStructures;
                //('this.levels', this.levels);
                const selectedLevelObj = this.levels.find(
                    (level) =>
                        level.name.toLowerCase() ===
                        this.dataUrl.levelName.toLowerCase()
                );
                this.selectedLevelObj = selectedLevelObj;
                this.levelCode = this.selectedLevelObj.levelCode;
                this.levelName = this.selectedLevelObj.name;
                this.levelParentName = this.dataUrl.levelParentName;
                this.parentLevel = this.levelCode - 1;
                //('parentLevel', this.parentLevel);
                if (this.parentLevel > 0) {
                    this.highLevel = false;
                    this.locationService
                        .list(this.selectedPais, this.parentLevel)
                        .subscribe((data) => {
                            //('pronz', data);
                            this.elements = data;
                            const lowerLevelName =
                                this.levelParentName.toLowerCase();
                            const selectedElementObj = this.elements.find(
                                (element) =>
                                    element.name.toLowerCase() ===
                                    lowerLevelName
                            );
                            this.selectedElement = selectedElementObj.uuid;
                        });
                } else if (this.parentLevel === 0) {
                    this.highLevel = true;
                }
            });
    }

    onSelectPais(pais: string) {
        this.levels = [];
        this.elements = [];
        this.selectedPais = '';
        this.selectedLevelObj = { levelCode: null, name: '' };
        this.selectedElement = null;
        //(pais);
        this.selectedPais = pais;
        this.countryCode = this.selectedPais;
        this.getLevelsPorPais(pais);
    }

    onSelectLevel(level: any) {
        //this.selectedLevel = null;
        this.elements = [];
        //('level', level);
        this.levelCode = level.levelCode;
        this.levelName = level.name;
        this.parentLevel = this.levelCode - 1;
        //('parentLevel', this.parentLevel);
        if (this.parentLevel > 0) {
            this.highLevel = false;
            this.locationService
                .list(this.selectedPais, this.parentLevel)
                .subscribe((data) => {
                    //('pronz', data);
                    this.elements = data;
                    //(this.elements);
                });
        } else if (this.parentLevel === 0) {
            this.highLevel = true;
            this.levelParentId = null;
            this.levelParentName = '';
            this.parentLevel = null;
        }
    }

    onSelectElement(element: any) {
        //('element', element);
        this.getElementProperties(element);
    }

    getElementProperties(elementUuid: any) {
        this.geostructureService.getGeoById(elementUuid).subscribe((data) => {
            //('data getGeoById', data);
            this.levelParentId = this.parentLevel;
            this.levelParentName = data.name;
        });
    }

    getDetail() {
        const uuid = this.activatedRoute.snapshot.params.uuid;

        this.locationService.detail(uuid).subscribe(
            (data) => {
                this.dataUrl = data;
                this.selectedPais = this.dataUrl.countryCode;
                this.getLevelsPorPais(this.selectedPais);
                this.name = this.dataUrl.name;
                this.areaPhoneCode = this.dataUrl.areaPhoneCode;
                this.zipCode = this.dataUrl.zipCode;
            },
            (err) => {
                Swal.fire(
                    'Advertencia',
                    'El registro no existe',
                    'warning'
                ).then(() => {
                    this.router.navigate(['/admin/location']);
                });
            }
        );
    }

    onUpdate(): void {
        if (!this.validateForm()) {
            Swal.fire({
                title: 'Error',
                text: 'Error, datos incorrectos. Por favor, revise e intente nuevamente.',
                icon: 'error',
            });
            return;
        }
        const uuid = this.activatedRoute.snapshot.params.uuid;

        if (this.parentLevel < 1) {
            this.parentLevel = null;
        }

        const newLocation = {
            countryCode: this.selectedPais,
            levelParentId: this.parentLevel,
            levelParentName: this.levelParentName,
            levelCode: this.levelCode,
            levelName: this.levelName,
            name: this.name,
            areaPhoneCode: this.areaPhoneCode,
            zipCode: this.zipCode,
        };

        this.locationService.update(uuid, newLocation).subscribe(
            (data) => {
                //('Hola');
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'La locaion se ha actualizado correctamente.',
                    icon: 'success',
                }).then(() => {
                    // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
                    this.router.navigate(['/admin/location']);
                });
            },
            (err) => {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al guardar agencia. Por favor, inténtalo nuevamente.',
                    icon: 'error',
                });
            }
        );

        // const anyArr = {
        //     name: this.name,
        //     emailAddress: this.emailAddress,
        //     phoneNumber: this.phoneNumber,
        //     line1: this.line1,
        //     line2: this.line2,
        //     latitude: this.latitude,
        //     longitude: this.longitude,
        //     locationId: this.selectedParroquia,
        // };

        // this.agencyService.update(id, anyArr).subscribe(
        //     (data) => {
        //         //('Hola');
        //         Swal.fire({
        //             title: '¡Éxito!',
        //             text: 'La agencia se ha actualizado correctamente.',
        //             icon: 'success',
        //         }).then(() => {
        //             this.isSaved = true;
        //             this.errorMessage = null;
        //             // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
        //             this.router.navigate(['/admin/agency']);
        //         });
        //     },
        //     (err) => {
        //         Swal.fire({
        //             title: 'Error',
        //             text: 'Error al guardar agencia. Por favor, inténtalo nuevamente.',
        //             icon: 'error',
        //         });
        //         this.isSaved = false;
        //         this.errorMessage =
        //             'Error al guardar la agencia. Por favor, inténtalo nuevamente.';
        //     }
        // );
    }

    validateForm(): boolean {
        if (this.highLevel) {
            if (
                !this.selectedPais ||
                !this.levelCode ||
                !this.levelName ||
                !this.name
            ) {
                //('if 1');
                this.errorMessage = 'Por favor, completa todos los campos.';
                return false;
            }
        } else {
            if (
                !this.selectedPais ||
                !this.parentLevel ||
                !this.levelParentName ||
                !this.levelCode ||
                !this.levelName ||
                !this.name
            ) {
                //('if 2');
                this.errorMessage = 'Por favor, completa todos los campos.';
                return false;
            }
        }

        this.errorMessage = null;
        return true;
    }
}

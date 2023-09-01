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
    selector: 'app-location-detail',
    templateUrl: './location-detail.component.html',
    styleUrls: ['./location-detail.component.scss'],
})
export class LocationDetailComponent implements OnInit {
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
            console.log(data);
            this.paises = data;
            console.log(this.paises);
            console.log(this.paises.length);
        });
    }

    getLevelsPorPais(pais: string): void {
        this.geostructureService
            .getGeostructureByCode(pais)
            .subscribe((data) => {
                console.log('getLevelsPorPais', data.geoStructures);
                this.levels = data.geoStructures;
                console.log('this.levels', this.levels);
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
                console.log('parentLevel', this.parentLevel);
                if (this.parentLevel > 0) {
                    this.highLevel = false;
                    this.locationService
                        .list(this.selectedPais, this.parentLevel)
                        .subscribe((data) => {
                            console.log('pronz', data);
                            this.elements = data;
                            console.log(this.elements);
                            console.log('thisParentName', this.levelParentName);
                            const selectedElementObj = this.elements.find(
                                (element) =>
                                    element.name.toLowerCase() ===
                                    this.levelParentName.toLowerCase()
                            );
                            this.selectedElement = selectedElementObj.uuid;
                        });
                } else if (this.parentLevel === 0) {
                    this.highLevel = true;
                }
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
}

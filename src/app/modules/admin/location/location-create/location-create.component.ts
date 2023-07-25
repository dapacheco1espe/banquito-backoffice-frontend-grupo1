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
    selectedLevel: string = '';

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
    }

    onSelectPais(pais: string) {
        console.log(pais);
        this.selectedPais = pais;
        this.selectedLevel = '';
        this.getLevelsPorPais(pais);
    }

    onSelectLevel(level: any) {
        console.log('level', level);
        this.selectedLevel = level;
        console.log('selectedLevel', this.selectedLevel);
        this.locationService
            .list(this.selectedPais, this.selectedLevel)
            .subscribe((data) => {
                console.log('pronz', data);
                this.elements = data;
                console.log(this.elements);
            });
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
}

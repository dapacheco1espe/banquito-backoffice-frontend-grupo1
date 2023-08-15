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
    selector: 'app-holiday-detail',
    templateUrl: './holiday-detail.component.html',
    styleUrls: ['./holiday-detail.component.scss'],
})
export class HolidayDetailComponent implements OnInit {
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
}

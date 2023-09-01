import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeostructureService } from 'app/services/geostructure.service';
import { HolidayService } from 'app/services/holiday.service';
import { LocationService } from 'app/services/location.service';
import Swal from 'sweetalert2';
import {
    Geostructure,
    GeostructureLevel,
} from '../../geostructure/geostructure-model/geostructure';

@Component({
    selector: 'app-holiday-detail',
    templateUrl: './holiday-detail.component.html',
    styleUrls: ['./holiday-detail.component.scss'],
})
export class HolidayDetailComponent implements OnInit {
    dataUrl: any = {};

    holidayDate: Date;
    holidayDateString: String;
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
            //(data);
            this.paises = data;
            //(this.paises);
            //(this.paises.length);
        });
    }

    onSelectPais(pais: string) {
        //(pais);
        this.selectedPais = pais;
    }

    onSelectType(type: string) {
        this.geoLocationId = null;
        //(type);
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
                //('getLevelsPorPais', data.geoStructures);
                this.levels = data.geoStructures;
                //('this.levels', this.levels);
            });
    }

    onSelectLevel(level: any) {
        this.elements = [];
        //('level', level);
        this.locationService
            .list(this.selectedPais, level.levelCode)
            .subscribe((data) => {
                //('pronz', data);
                this.elements = data;
                //(this.elements);
            });
    }

    onSelectElement(element: any) {
        //('element', element);
        this.geoLocationId = element;
    }
    getDetail(): void {
        const uuid = this.activatedRoute.snapshot.params.uuid;
        this.holidayService.detail(uuid).subscribe(
            (data) => {
                //('getDetail update', data);
                this.dataUrl = data;
                this.holidayDate = new Date(this.dataUrl.holidayDate);
                const formattedDate = `${this.holidayDate.getFullYear()}/${
                    this.holidayDate.getMonth() + 1
                }/${this.holidayDate.getDate()}`;
                this.holidayDateString = formattedDate;
                this.countryCode = this.dataUrl.countryCode;
                this.geoLocationId = this.dataUrl.geoLocationId;
                this.name = this.dataUrl.name;
                this.type = this.dataUrl.type;
            },
            (err) => {
                //('No encuentra NADA');
                Swal.fire(
                    'Advertencia',
                    'El registro no existe',
                    'warning'
                ).then(() => {
                    this.router.navigate(['/admin/holiday']);
                });
            }
        );
    }
}

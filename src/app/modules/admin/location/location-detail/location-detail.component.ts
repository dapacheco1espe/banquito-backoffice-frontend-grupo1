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
    selector: 'app-location-detail',
    templateUrl: './location-detail.component.html',
    styleUrls: ['./location-detail.component.scss'],
})
export class LocationDetailComponent implements OnInit {
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

    ngOnInit(): void {}
}

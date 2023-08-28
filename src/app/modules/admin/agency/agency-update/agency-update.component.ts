import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyService } from 'app/services/agency.service';
import { Agency } from '../agency-model/agency';
import { Geolocation } from '../../geostructure/geostructure-model/geolocation';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { GeostructureService } from 'app/services/geostructure.service';
import { GeolocationService } from 'app/services/geolocation.service';

@Component({
    selector: 'app-agency-update',
    templateUrl: './agency-update.component.html',
    styleUrls: ['./agency-update.component.scss'],
})
export class AgencyUpdateComponent implements OnInit {
    dataUrl: any = {};

    id!: number;
    ubication!: String;
    code!: string;
    name!: String;
    uniqueKey!: String;
    state!: String;
    emailAddress!: string;
    phoneNumber!: string;
    line1!: String;
    line2!: String;
    creationDate!: String;
    latitude!: number;
    longitude!: number;
    isSaved: boolean | null = null;
    errorMessage: string | null = null;

    provincias: Geolocation[] = [];
    cantones: Geolocation[] = [];
    parroquias: Geolocation[] = [];

    aux: any;

    selectedProvincia: string = '';
    selectedCanton: string = '';
    selectedParroquia: string = '';

    handledProv: string = '';
    handledCant: string = '';
    handledParr: string = '';

    constructor(
        private agencyService: AgencyService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private geolocationService: GeolocationService
    ) {}

    ngOnInit(): void {
        this.getDetail();
        this.getProvincias();
    }

    getDetail(): void {
        const id = this.activatedRoute.snapshot.params.id;
        const prov = this.activatedRoute.snapshot.params.prov;
        const cant = this.activatedRoute.snapshot.params.cant;
        this.agencyService.detail(id).subscribe(
            (data) => {
                this.dataUrl = data;
                console.log('getDetail update', this.dataUrl);
                this.id = this.dataUrl.id || 0;
                this.ubication = this.dataUrl.ubication || '';
                this.code = this.dataUrl.code || '';
                this.name = this.dataUrl.name || '';
                this.uniqueKey = this.dataUrl.uniqueKey || '';
                this.state = this.dataUrl.state || '';
                this.emailAddress = this.dataUrl.emailAddress || '';
                this.phoneNumber = this.dataUrl.phoneNumber || '';
                this.line1 = this.dataUrl.line1 || '';
                this.line2 = this.dataUrl.line2 || '';
                this.creationDate = this.dataUrl.creationDate || '';
                this.latitude = this.dataUrl.latitude || 0;
                this.longitude = this.dataUrl.longitude || 0;
                this.handledProv = prov;
                this.handledCant = cant;
                this.geolocationService
                    .getGeoById(this.dataUrl.locationId)
                    .subscribe((data) => {
                        this.aux = data;
                        this.handledParr = this.aux.name;
                    });
            },
            (err) => {
                console.log('No encuentra NADA');
                Swal.fire(
                    'Advertencia',
                    'El registro no existe',
                    'warning'
                ).then(() => {
                    this.router.navigate(['/admin/agency']);
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
        const id = this.activatedRoute.snapshot.params.id;

        const agency = new Agency(
            '64b75a14b60d240c0e96e608',
            this.selectedParroquia,
            this.code,
            this.name,
            this.uniqueKey,
            this.state,
            this.emailAddress,
            this.phoneNumber,
            this.line1,
            this.line2,
            this.creationDate,
            this.latitude,
            this.longitude
        );

        const anyArr = {
            name: this.name,
            emailAddress: this.emailAddress,
            phoneNumber: this.phoneNumber,
            line1: this.line1,
            line2: this.line2,
            latitude: this.latitude,
            longitude: this.longitude,
            locationId: this.selectedParroquia,
        };

        this.agencyService.update(id, anyArr).subscribe(
            (data) => {
                console.log('Hola');
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'La agencia se ha actualizado correctamente.',
                    icon: 'success',
                }).then(() => {
                    this.isSaved = true;
                    this.errorMessage = null;
                    // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
                    this.router.navigate(['/admin/agency']);
                });
            },
            (err) => {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al guardar agencia. Por favor, inténtalo nuevamente.',
                    icon: 'error',
                });
                this.isSaved = false;
                this.errorMessage =
                    'Error al guardar la agencia. Por favor, inténtalo nuevamente.';
            }
        );
    }
    validateForm(): boolean {
        if (
            !this.code ||
            !this.name ||
            !this.emailAddress ||
            !this.phoneNumber ||
            !this.line1 ||
            !this.line2 ||
            !this.latitude ||
            !this.longitude
        ) {
            this.errorMessage = 'Por favor, completa todos los campos.';
            console.log('if');
            return false;
        }

        // Validar el formato de los campos
        // Codigo SWIFT
        if (!/^BAQECEQ\d{3}$/.test(this.code)) {
            console.log('baqeceq');
            this.errorMessage =
                'El codigo SWIFT debe seguir el formato estandar';
            return false;
        }
        // Email
        if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                this.emailAddress
            )
        ) {
            console.log('email');
            this.errorMessage = 'El email debe tener un estructura estándar';
            return false;
        }
        // Telefono
        if (!/^[\d\s()]+$/.test(this.phoneNumber)) {
            console.log('telf');
            this.errorMessage = 'El número debe contener el formato estándar';
            return false;
        }
        this.errorMessage = null;
        return true;
    }

    onSelectProvincia(provincia: string) {
        console.log(provincia);
        this.selectedProvincia = provincia;
        this.selectedCanton = '';
        this.selectedParroquia = '';
        this.parroquias = [];
        this.getCantonesPorProvincia(provincia);
    }

    onSelectCanton(canton: string) {
        this.selectedCanton = canton;
        this.selectedParroquia = '';
        this.getParroquiasPorCanton(canton);
    }

    onSelectParroquia(parroquia: any) {
        this.selectedParroquia = parroquia;
        console.log(parroquia);
    }

    getProvincias(): void {
        this.agencyService.listProv().subscribe((data) => {
            console.log(data);
            this.provincias = data;
            console.log(this.provincias);
        });
    }

    getCantonesPorProvincia(provincia: string): void {
        this.agencyService.listCant(provincia).subscribe((data) => {
            console.log(data);
            this.cantones = data;
            console.log(this.cantones);
        });
    }

    getParroquiasPorCanton(canton: string): void {
        this.agencyService.listParr(canton).subscribe((data) => {
            console.log(data);
            this.parroquias = data;
            console.log(this.parroquias);
        });
    }
}

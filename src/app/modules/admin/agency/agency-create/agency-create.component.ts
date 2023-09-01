import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencyService } from 'app/services/agency.service';
import Swal from 'sweetalert2';
import { Geolocation } from '../../geostructure/geostructure-model/geolocation';

@Component({
    selector: 'app-agency-create',
    templateUrl: './agency-create.component.html',
    styleUrls: ['./agency-create.component.scss'],
})
export class AgencyCreateComponent implements OnInit {
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

    constructor(private agencyService: AgencyService, private router: Router) {}

    ngOnInit(): void {
        this.getProvincias();
    }

    onCreate(): void {
        if (!this.validateForm()) {
            Swal.fire({
                title: 'Error',
                text: 'Error, datos incorrectos. Por favor, revise e intente nuevamente.',
                icon: 'error',
            });
            return;
        }

        const anyArr = {
            code: this.code,
            bankEntityId: '64b09cc56666b939a406a823',
            locationId: this.selectedParroquia,
            name: this.name,
            emailAddress: this.emailAddress,
            phoneNumber: this.phoneNumber,
            line1: this.line1,
            line2: this.line2,
            latitude: this.latitude,
            longitude: this.longitude,
        };

        this.agencyService.create(anyArr).subscribe(
            (data) => {
                //('Hola');
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'La nueva agencia se ha guardado correctamente.',
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
            //('if');
            return false;
        }

        // Validar el formato de los campos
        // Codigo SWIFT
        if (!/^BAQECEQ\d{3}$/.test(this.code)) {
            //('baqeceq');
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
            //('email');
            this.errorMessage = 'El email debe tener un estructura estándar';
            return false;
        }
        // Telefono
        if (!/^[\d\s()]+$/.test(this.phoneNumber)) {
            //('telf');
            this.errorMessage = 'El número debe contener el formato estándar';
            return false;
        }
        this.errorMessage = null;
        return true;
    }

    onSelectProvincia(provincia: string) {
        //(provincia);
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
        //(parroquia);
    }

    getProvincias(): void {
        this.agencyService.listProv().subscribe((data) => {
            //(data);
            this.provincias = data;
            //(this.provincias);
        });
    }

    getCantonesPorProvincia(provincia: string): void {
        this.agencyService.listCant(provincia).subscribe((data) => {
            //(data);
            this.cantones = data;
            //(this.cantones);
        });
    }

    getParroquiasPorCanton(canton: string): void {
        this.agencyService.listParr(canton).subscribe((data) => {
            //(data);
            this.parroquias = data;
            //(this.parroquias);
        });
    }
}

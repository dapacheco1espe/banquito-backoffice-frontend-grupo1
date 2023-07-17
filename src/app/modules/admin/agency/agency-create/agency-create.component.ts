import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencyService } from 'app/services/agency.service';
import { Agency } from '../agency-model/agency';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

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

    constructor(private agencyService: AgencyService, private router: Router) {}

    ngOnInit(): void {}

    onCreate(): void {
        if (!this.validateForm()) {
            console.log('Entro al if');
            return;
        }

        const agency = new Agency(
            this.ubication,
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
        this.agencyService.create(agency).subscribe(
            (data) => {
                console.log('Hola');
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
        let dateNow = new Date();

        this.uniqueKey = uuidv4();
        this.state = 'ACTIVO';
        this.creationDate = dateNow.toISOString();

        if (
            !this.ubication ||
            !this.code ||
            !this.name ||
            !this.uniqueKey ||
            !this.state ||
            !this.emailAddress ||
            !this.phoneNumber ||
            !this.line1 ||
            !this.line2 ||
            !this.creationDate ||
            !this.latitude ||
            !this.longitude
        ) {
            this.errorMessage = 'Por favor, completa todos los campos.';
            return false;
        }

        // Validar el formato de los campos
        // Codigo SWIFT
        if (!/^BAQECEQ\d{3}$/.test(this.code)) {
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
            this.errorMessage = 'El email debe tener un estructura estándar';
            return false;
        }
        // Telefono
        if (!/[0-9]{3}-[0-9]{4}$/.test(this.phoneNumber)) {
            this.errorMessage = 'El email debe tener un estructura estándar';
            return false;
        }
        // // Latitud
        // if (!/^-?([0-8]?[0-9]\.\d+|90\.0+)$/.test()) {
        //     this.errorMessage = 'El email debe tener un estructura estándar';
        //     return false;
        // }
        // // Longitud
        // if (!/[0-9]{3}-[0-9]{4}$/.test(this.phoneNumber)) {
        //     this.errorMessage = 'El email debe tener un estructura estándar';
        //     return false;
        // }
        // Si todas las validaciones pasan, se considera el formulario válido
        this.errorMessage = null;
        return true;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyService } from 'app/services/agency.service';
import { Agency } from '../agency-model/agency';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

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

    constructor(
        private agencyService: AgencyService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.getDetail();
    }

    getDetail(): void {
        const id = this.activatedRoute.snapshot.params.id;
        this.agencyService.detail(id).subscribe(
            (data) => {
                this.dataUrl = data;
                console.log(this.dataUrl);
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
            },
            (err) => {
                console.log('No encuentra NADA');
                this.router.navigate(['']);
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
        this.agencyService.update(id, agency).subscribe(
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
        this.errorMessage = null;
        return true;
    }
}

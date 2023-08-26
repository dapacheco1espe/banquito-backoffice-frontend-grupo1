import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    GeostructureLevel,
    Geostructure,
} from '../geostructure-model/geostructure';
import { GeostructureService } from 'app/services/geostructure.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-geostructure-create',
    templateUrl: './geostructure-create.component.html',
    styleUrls: ['./geostructure-create.component.scss'],
})
export class GeostructureCreateComponent implements OnInit {
    countryCode!: string;
    phoneCode!: string;
    name!: string;
    geostructureLevels = [];
    items = ['Provincia', 'Cantón', 'Parroquia'];
    newElement!: string;

    level: any;

    isSaved: boolean | null = null;
    errorMessage: string | null = null;

    constructor(
        private geostructureService: GeostructureService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    onCreate(): void {
        let index = 1;
        if (!this.validateForm()) {
            Swal.fire({
                title: 'Error',
                text: 'Error, datos incorrectos. Por favor, revise e intente nuevamente.',
                icon: 'error',
            });
            return;
        }

        this.items.forEach((element) => {
            console.log('element', element);
            console.log('index', index);
            this.level = {
                levelCode: index,
                name: element,
            };
            this.geostructureLevels.push(this.level);
            index++;
        });

        console.log(this.geostructureLevels);

        const geostructure = new Geostructure(
            this.countryCode,
            this.phoneCode,
            this.name,
            this.geostructureLevels
        );

        console.log('enviar a back', geostructure);

        this.geostructureService.create(geostructure).subscribe(
            (data) => {
                console.log('Hola');
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'La nueva estructura se ha guardado correctamente.',
                    icon: 'success',
                }).then(() => {
                    this.isSaved = true;
                    this.errorMessage = null;
                    // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
                    this.router.navigate(['/admin/geostructure']);
                });
            },
            (err) => {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al guardar estructura. Por favor, inténtalo nuevamente.',
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
            !this.countryCode ||
            !this.phoneCode ||
            !this.name ||
            !this.geostructureLevels
        ) {
            console.log('if');
            this.errorMessage = 'Por favor, completa todos los campos.';
            return false;
        }

        // Validar el formato de los campos
        // Codigo de Pais segun
        if (!/^[A-Z]{3}$/.test(this.countryCode)) {
            this.errorMessage =
                'El codigo SWIFT debe seguir el formato estandar';
            console.log('ECU Alfa');
            return false;
        }
        // Codigo Telefónico
        if (!/^\+\d{1,3}$/.test(this.phoneCode)) {
            this.errorMessage = 'El email debe tener un estructura estándar';
            console.log('Codigo');
            return false;
        }
        this.errorMessage = null;
        return true;
    }

    dropItem(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.items, event.previousIndex, event.currentIndex);
        console.log('this.items', this.items);
    }

    newElementFoo() {
        if (this.newElement.trim()) {
            this.items.push(this.newElement);
            this.newElement = ''; // Limpiar el campo de entrada después de agregar
            console.log('this.items', this.items);
        }
    }

    deleteElement(index: number) {
        this.items.splice(index, 1);
    }
}

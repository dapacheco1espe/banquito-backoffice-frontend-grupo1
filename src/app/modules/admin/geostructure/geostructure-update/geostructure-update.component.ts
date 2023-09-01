import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeostructureService } from 'app/services/geostructure.service';
import Swal from 'sweetalert2';
import {
    GeostructureLevel
} from '../geostructure-model/geostructure';

@Component({
    selector: 'app-geostructure-update',
    templateUrl: './geostructure-update.component.html',
    styleUrls: ['./geostructure-update.component.scss'],
})
export class GeostructureUpdateComponent implements OnInit {
    dataUrl: any = {};

    countryCode!: string;
    phoneCode!: string;
    name!: string;
    geoStructures!: GeostructureLevel[];
    geostructureLevels = [];
    items = [];

    newElement!: string;
    level: any;
    insertLevelFlag: boolean = true;

    isSaved: boolean | null = null;
    errorMessage: string | null = null;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private geostructureService: GeostructureService
    ) {}

    ngOnInit(): void {
        this.getDetail();
    }

    getDetail(): void {
        const id = this.activatedRoute.snapshot.params.id;
        const prov = this.activatedRoute.snapshot.params.prov;
        const cant = this.activatedRoute.snapshot.params.cant;
        this.geostructureService.detail(id).subscribe(
            (data) => {
                this.dataUrl = data;
                //('getDetail update', this.dataUrl);
                this.countryCode = this.dataUrl.countryCode;
                this.name = this.dataUrl.name;
                this.phoneCode = this.dataUrl.phoneCode;
                this.geoStructures = this.dataUrl.geoStructures;
                this.geoStructures.forEach((element) => {
                    //('element', element);
                    this.items.push(element.name);
                });
                //(this.items);
            },
            (err) => {
                //('No encuentra NADA');
                Swal.fire(
                    'Advertencia',
                    'El registro no existe',
                    'warning'
                ).then(() => {
                    this.router.navigate(['/admin/geostructure']);
                });
            }
        );
    }

    onUpdate(): void {
        let index = 1;
        if (!this.validateForm()) {
            Swal.fire({
                title: 'Error',
                text: 'Error, datos incorrectos. Por favor, revise e intente nuevamente.',
                icon: 'error',
            });
            return;
        }

        this.geostructureLevels = [];

        this.items.forEach((element) => {
            //('element', element);
            //('index', index);
            this.level = {
                levelCode: index,
                name: element,
            };
            this.geostructureLevels.push(this.level);
            index++;
        });

        //('geostructureLevels', this.geostructureLevels);

        const id = this.activatedRoute.snapshot.params.id;

        const anyArr = {
            name: this.name,
            phoneCode: this.phoneCode,
            geoStructures: this.geostructureLevels,
        };

        //('enviar a back', anyArr);

        this.geostructureService.update(id, anyArr).subscribe(
            (data) => {
                //('Hola');
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'La agencia se ha actualizado correctamente.',
                    icon: 'success',
                }).then(() => {
                    // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
                    this.router.navigate(['/admin/geostructure']);
                });
            },
            (err) => {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al guardar agencia. Por favor, inténtalo nuevamente.',
                    icon: 'error',
                });
            }
        );
    }
    validateForm(): boolean {
        if (
            !this.countryCode ||
            !this.phoneCode ||
            !this.name ||
            !this.geoStructures
        ) {
            //('if');
            this.errorMessage = 'Por favor, completa todos los campos.';
            return false;
        }

        // Validar el formato de los campos
        // Codigo de Pais segun
        if (!/^[A-Z]{3}$/.test(this.countryCode)) {
            this.errorMessage =
                'El codigo SWIFT debe seguir el formato estandar';
            //('ECU Alfa');
            return false;
        }
        // Codigo Telefónico
        if (!/^\+\d{1,3}$/.test(this.phoneCode)) {
            this.errorMessage = 'El email debe tener un estructura estándar';
            //('Codigo');
            return false;
        }
        this.errorMessage = null;
        return true;
    }

    dropItem(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.items, event.previousIndex, event.currentIndex);
        //('this.items', this.items);
    }

    newElementFoo() {
        if (this.newElement.trim()) {
            this.items.push(this.newElement);
            this.newElement = ''; // Limpiar el campo de entrada después de agregar
            //('this.items', this.items);
            if (this.items.length > 4) {
                this.insertLevelFlag = false;
            } else {
                this.insertLevelFlag = true;
            }
        }
    }

    deleteElement(index: number) {
        this.items.splice(index, 1);
        if (this.items.length > 4) {
            this.insertLevelFlag = false;
        } else {
            this.insertLevelFlag = true;
        }
    }
}

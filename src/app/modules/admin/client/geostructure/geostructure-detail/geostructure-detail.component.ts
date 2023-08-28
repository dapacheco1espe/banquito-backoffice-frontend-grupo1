import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    GeostructureLevel,
    Geostructure,
} from '../geostructure-model/geostructure';
import { GeostructureService } from 'app/services/geostructure.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-geostructure-detail',
    templateUrl: './geostructure-detail.component.html',
    styleUrls: ['./geostructure-detail.component.scss'],
})
export class GeostructureDetailComponent implements OnInit {
    dataUrl: any = {};
    items = [];
    constructor(
        private geostructureService: GeostructureService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.getDetail();
    }

    getDetail(): void {
        const id = this.activatedRoute.snapshot.params.id;
        this.geostructureService.detail(id).subscribe(
            (data) => {
                this.dataUrl = data;
                console.log(this.dataUrl);
                this.items = this.dataUrl.geoStructures;
            },
            (err) => {
                console.log('No encuentra NADA');
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
}

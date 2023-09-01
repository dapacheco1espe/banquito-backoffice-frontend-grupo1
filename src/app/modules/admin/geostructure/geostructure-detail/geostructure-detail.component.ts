import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeostructureService } from 'app/services/geostructure.service';
import Swal from 'sweetalert2';

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
                //(this.dataUrl);
                this.items = this.dataUrl.geoStructures;
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
}

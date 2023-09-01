import { Component, OnInit } from '@angular/core';
// import { Agency } from '../model/agency';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyService } from 'app/services/agency.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-agency-detail',
    templateUrl: './agency-detail.component.html',
    styleUrls: ['./agency-detail.component.scss'],
})
export class AgencyDetailComponent implements OnInit {
    dataUrl: any = {};

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
                //(this.dataUrl);
            },
            (err) => {
                //('No encuentra NADA');
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
}

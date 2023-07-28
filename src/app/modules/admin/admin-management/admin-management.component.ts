import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-management',
    templateUrl: './admin-management.component.html',
    styleUrls: ['./admin-management.component.scss'],
})
export class AdminManagementComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    public navigateToPages(
        page: 'agency' | 'geostructure' | 'location' | 'holiday'
    ) {
        this.router.navigateByUrl(`/admin/${page}`);
    }
}

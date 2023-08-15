import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    public navigateToPages(page: 'admin-management' | 'gestion' | 'gestion-cuentas') {
        this.router.navigateByUrl(`/admin/${page}`);
    }
}

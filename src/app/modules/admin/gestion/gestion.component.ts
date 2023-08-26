import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gestion',
    templateUrl: './gestion.component.html',
    styleUrls: ['./gestion.component.scss'],
})
export class GestionComponent implements OnInit {
    constructor(private _router: Router) {}

    ngOnInit(): void {}
    public goToDefinedOperation(operation: 'naturales' | 'juridicos'): void {
        operation === 'naturales'
            ? this._router.navigateByUrl('/admin/gestion-naturales')
            : this._router.navigateByUrl('/admin/gestion-juridicos');
    }

    public goToDefinedRol(operation: 'roles'): void {
        operation === 'roles'
            ? this._router.navigateByUrl('/admin/gestion-roles')
            : this._router.navigateByUrl('/admin');
    }
}

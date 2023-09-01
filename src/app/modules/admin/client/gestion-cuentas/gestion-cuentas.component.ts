import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { EMPTY, Subject } from 'rxjs';
import { catchError, debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { Company } from './Models/Company';
import { GestionCuentasService } from './services/gestion-cuentas.service';

@Component({
    selector: 'app-gestion-cuentas',
    templateUrl: './gestion-cuentas.component.html',
    styleUrls: ['./gestion-cuentas.component.scss'],
    animations: fuseAnimations,
})
export class GestionCuentasComponent implements OnInit {
    public searchInputControl!: FormControl;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    public searchQuery: string = '';
    public company: Company;
    constructor(private router: Router, private _gestionCuentasService:GestionCuentasService,
      private _changeDetectorRef:ChangeDetectorRef) {
        this.searchInputControl = new FormControl();
        this._initCompany();
    }
    ngOnInit(): void {
      this._initSearchInputControl();
    }
    public navigateToPages(page: 'management') {
        this.router.navigateByUrl(`/admin/gestion-cuentas/${page}`);
    }

    private _initCompany() {
        this.company = null;
    }
    private _initSearchInputControl() {
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.searchQuery = query;
                    this._initCompany();
                    return this._gestionCuentasService
                        .getCompanyByGroupName(this.searchQuery)
                        .pipe(
                            catchError((error) => {
                                return EMPTY;
                            })
                        );
                }),
                map((company) => {
                    this.company = { ...company };
                    this._changeDetectorRef.markForCheck();
                })
            )
            .subscribe();
    }
}

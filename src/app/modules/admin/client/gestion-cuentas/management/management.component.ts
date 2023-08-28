import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { Company } from '../Models/Company';
import { GestionCuentasService } from '../services/gestion-cuentas.service';
@Component({
    selector: 'app-management',
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
    public isEnabledMoreFields:boolean = false;
    public company: Company;
    public searchInputControl: FormControl;
    public searchQuery: string = '';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _gestionCuentasService: GestionCuentasService
    ) {
        this.searchInputControl = new FormControl();
        this._initCompany();
    }

    ngOnInit(): void {
        this._initSearchInputControl();
    }
    public enableOtherFieldsToCreateAccount(){
      this.isEnabledMoreFields = true;
    }

    private _initCompany() {
        this.company = {
            branchId: '',
            locationId: '',
            uniqueKey: '',
            groupName: '',
            emailAddress: '',
            phoneNumber: '',
            line1: '',
            line2: '',
            latitude: 0,
            longitude: 0,
            creationDate: '',
            activationDate: '',
            lastModifiedDate: '',
            state: '',
            closedDate: '',
            comments: '',
            members: [],
        };
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
                                this.isEnabledMoreFields = false;
                                return EMPTY;
                            })
                        );
                }),
                map((company) => {
                    this.isEnabledMoreFields = false;
                    this.company = { ...company };
                    this._changeDetectorRef.markForCheck();
                })
            )
            .subscribe();
    }
}

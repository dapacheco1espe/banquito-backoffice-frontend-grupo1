import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Subject } from 'rxjs';
import {
    catchError,
    debounceTime,
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { AccountRQ } from '../Models/AccountRQ';
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
    public searchInputControl!: FormControl;
    public accountForm:FormGroup;
    public searchQuery: string = '';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _gestionCuentasService: GestionCuentasService,
        private _formBuilder:FormBuilder,
    ) {
        this.searchInputControl = new FormControl();
        this._initCompany();
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.accountForm = this._formBuilder.group({
                accountType:[null,Validators.required],
                interestRate:[null,Validators.required],
            });
        }, 0);
        this._changeDetectorRef.markForCheck();
        this._initSearchInputControl();
    }

    public createAccountForCompany(){
        const account:AccountRQ = {
            name: this.accountForm.value.accountType,
            blockedBalance:0,
            codeInternationalAccount:'',
            lastInterestCalculationDate:'',
            interestRate: this.accountForm.value.interestRate,
            productUk:'',
            codeInternalAccount:"",
            totalBalance: 0,
            allowOverdraft: false,
            maxOverdraft: 0,
            accountHolderCode: this.accountForm.value.accountType+uuidv4(),
            accountHolderType:'GRO',
            state: 'ACT',
            groupUk: this.company.uniqueKey,
            availableBalance: 0,
            clientUk: this.company.members[0].clientId,

        };
        this._gestionCuentasService.createCompany(account).subscribe({
            next:(res)=>{
                console.log(res);
            }
        });
    }
    public enableOtherFieldsToCreateAccount(){
      this.isEnabledMoreFields = true;
      this._changeDetectorRef.markForCheck();
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

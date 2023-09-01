import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { EMPTY, Subject } from 'rxjs';
import {
    catchError,
    debounceTime,
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';
import { AccountRQ } from '../Models/AccountRQ';
import { Company } from '../Models/Company';
import { Product } from '../Models/Product';
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
    public passiveProductsList:Array<Product>;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _gestionCuentasService: GestionCuentasService,
        private _formBuilder:FormBuilder,
        private _alertService:FuseConfirmationService
    ) {
        this.searchInputControl = new FormControl();
        this._initCompany();
    }

    ngOnInit(): void {
        setTimeout(() => {
            this._gestionCuentasService.listPassiveProducts()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
                next:(response:Array<Product>)=>{
                    this.passiveProductsList = [...response];
                }
            });
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
            codeInternalAccount:"",
            name: this.accountForm.value.accountType,
            totalBalance: 0,
            availableBalance: 0,
            blockedBalance:0,
            lastInterestCalculationDate:new Date().toISOString(),
            codeInternationalAccount:'',
            allowOverdraft: false,
            maxOverdraft: 0,
            accountHolderCode: this.accountForm.value.accountType,
            accountHolderType:'GRO',
            state: 'ACT',
            interestRate: this.accountForm.value.interestRate,
            productUk:this.accountForm.get('accountType').value,
            groupUk: this.company.uniqueKey,
            clientUk: '',
        };
        this._gestionCuentasService.createCompany(account).subscribe({
            next:(res)=>{
                const confirmation = this._alertService.open({
                    title:'Creación de cuentas',
                    message:'La cuenta ha sido creada de forma exitosa',
                    icon:{
                        color:'success',
                        name:'heroicons_outline:check-badge',
                    },
                    actions:{
                        confirm:{
                            label:'Aceptar',
                            color:'primary',
                        },
                        cancel:{
                            show:false,
                        }
                    }
                });
            },
            error:(error:HttpErrorResponse)=>{
                const confirmation = this._alertService.open({
                    title:'Error al crear cuenta',
                    message:'No se pudo crear la cuenta debido a que ya existe o hubo un error en el proceso',
                    actions:{
                        confirm:{
                            label:'Aceptar',
                        },
                        cancel:{
                            show:false,
                        }
                    }
                });
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

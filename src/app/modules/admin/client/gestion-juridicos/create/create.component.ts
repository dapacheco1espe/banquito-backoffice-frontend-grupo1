import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'app/services/companyService';
import { Company } from '../model/company';

import Swal from 'sweetalert2';
import { CompanyMember } from '../model/companyMember';
import { Agency } from '../../agency/agency-model/agency';
import { Location } from '../../location/location-model/location';
import { AgencyService } from 'app/services/agency.service';
import { LocationService } from 'app/services/location.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  branchId!: String;
  locationId!: String;
  uniqueKey!: String;
  groupName!: String;
  emailAddress!: String;
  phoneNumber!: String;
  line1!: String;
  line2!: String;
  latitude!: number;
  longitude!: number;
  comments: String;
  creationDate: String;
  lastModifiedDate: String;
  companyMembers : CompanyMember;
  state: String;
  agencias:Agency[]=[];
  locaciones:Location[]=[];
  isSaved: boolean | null = null;
  errorMessage: string | null = null;
  createForm: FormGroup;
  constructor(
    private fb: FormBuilder,  // Inyecta FormBuilder
    private companyService: CompanyService,
    private router: Router,
    private agencyService: AgencyService,
    private locationService: LocationService
  ) {
    // Crea el FormGroup y define las validaciones
    this.createForm = this.fb.group({
      branchId: ['', Validators.required],
      locationId: ['', Validators.required],
      uniqueKey: [''],
      groupName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      line1: ['', Validators.required],
      line2: ['',Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      comments: [''],
      creationDate: [''],
      lastModifiedDate: [''],
      state: [''],
      companyMembers: ['']
    });
  }

  ngOnInit(): void {
    this.agencyService.listAllAgencies().subscribe(
      (response) => {
        this.agencias = response;
      }
    );

    this.locationService.listAllLocations().subscribe(
      (response) => {
        this.locaciones = response;
      }
    );
  }

  onCreate(): void {
    console.log('Formulario válido:', this.createForm.valid);
    if (this.createForm.valid) {
      const company = new Company(
        this.createForm.value.branchId,
        this.createForm.value.locationId,
        this.createForm.value.uniqueKey,
        this.createForm.value.groupName,
        this.createForm.value.emailAddress,
        this.createForm.value.phoneNumber,
        this.createForm.value.line1,
        this.createForm.value.line2,
        this.createForm.value.latitude,
        this.createForm.value.longitude,
        this.createForm.value.comments,
        this.createForm.value.creationDate,
        this.createForm.value.lastModifiedDate,
        this.createForm.value.state,
        this.companyMembers
      );
  
      this.companyService.create(company).subscribe(
        data => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'El usuario se ha guardado correctamente.',
            icon: 'success'
          }).then(() => {
            this.isSaved = true;
            this.errorMessage = null;
            // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
            this.router.navigate(['/gestion/gestion-juridicos/createRole/' + this.createForm.value.groupName]);
          });
        },
        err => {
          Swal.fire({
            title: 'Error',
            text: 'Error al guardar el usuario. Por favor, inténtalo nuevamente.',
            icon: 'error'
          });
          this.isSaved = false;
          this.errorMessage = 'Error al guardar el usuario. Por favor, inténtalo nuevamente.';
        }
      );
    }
  }
  
  
  
  
}
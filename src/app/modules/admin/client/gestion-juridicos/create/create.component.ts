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

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private agencyService:AgencyService,
    private locationService:LocationService


  ) { }

  ngOnInit(): void {

    this.agencyService.listAllAgencies().subscribe(
      (response)=>{
          this.agencias=response;
      }
  );

  this.locationService.listAllLocations().subscribe(
    (response)=>{
        this.locaciones=response;
    }
);

  }

  onCreate(): void {
    

  const company = new Company(this.branchId,this.locationId,this.uniqueKey,this.groupName,this.emailAddress,this.phoneNumber,this.line1,this.line2,this.latitude,this.longitude,this.comments,this.creationDate,this.lastModifiedDate,this.state,this.companyMembers);

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
          this.router.navigate(['/gestion/gestion-juridicos/createRole/'+this.groupName]);
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

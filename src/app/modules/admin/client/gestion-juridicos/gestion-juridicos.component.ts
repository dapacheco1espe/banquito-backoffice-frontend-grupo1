import { Component, OnInit } from "@angular/core";
import { fuseAnimations } from '@fuse/animations';


import { ActivatedRoute, Router } from "@angular/router";
import { CompanyService } from "app/services/companyService";
import Swal from 'sweetalert2';
import { Company } from "./model/company";

@Component({
  selector: 'app-gestion-juridicos',
  templateUrl: 'gestion-juridicos.component.html',
  styleUrls: ['gestion-juridicos.component.scss'],
  animations: fuseAnimations
})
export class GestionJuridicosComponent implements OnInit {
  company: Company | undefined;
  groupName!: String;
  constructor(
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany(): void {
    this.companyService.detail(this.groupName).subscribe(
      (data) => {
        this.company = data;
        //(this.company);
      },
      (err) => {
        // Mostrar mensaje de error con SweetAlert
      }
    );
  }
  buscarCliente(): void {
    this.companyService.detail(this.groupName).subscribe(
      (data) => {
        this.company = data;
        //(this.company);
  
        // Mostrar mensaje de éxito con SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Compañia encontrada',
          text: 'La información de la compañia ha sido cargada correctamente.',
          confirmButtonText: 'Aceptar',
        });
      },
      (err) => {
        // Mostrar mensaje de error con SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La compañia no pudo ser encontrado.',
          confirmButtonText: 'Aceptar',
        });
  
        this.router.navigate(['/admin/gestion-juridicos']);
      }
    );
  }
  

}

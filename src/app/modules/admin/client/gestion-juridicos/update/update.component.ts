import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Company } from '../model/company';
import { CompanyService } from 'app/services/companyService';
import { Cliente } from '../../gestion-naturales/model/cliente';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  groupName: String = this.activatedRoute.snapshot.params['groupName'] ;
  uniqueKey: String = this.activatedRoute.snapshot.params['uniqueKey'];
  isSaved: boolean | null = null;
  errorMessage: string | null = null;
  company!: Company
  cliente!: Cliente
  roles!: Company
    constructor(
      private companyService: CompanyService,
      private router: Router,
      private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
      this.getCompany();
     
    }
    
    onUpdate(): void {
      this.companyService.update(this.uniqueKey, this.company).subscribe(
        data => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'La compañia se ha actualizado correctamente.',
            icon: 'success',

          }).then(() => {

            this.isSaved = true;
            this.errorMessage = null;
            // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
            this.router.navigate(['/admin/gestion-juridicos']);
          });
        },
        err => {
          Swal.fire({
            title: 'Error',
            text: 'Error al guardar la compañia. Por favor, inténtalo nuevamente.',
            icon: 'error'
          });

          this.isSaved = false;
          this.errorMessage = 'Error al guardar la compañia. Por favor, inténtalo nuevamente.';
        }
      );
    }
    getCompany(): void {
      console.log(this.activatedRoute.snapshot.data)
      const groupName = this.activatedRoute.snapshot.params['groupName'];
      this.companyService.detail(groupName).subscribe(
        (data) => {
          this.company = data;
        },
        (err) => {
          // Mostrar mensaje de error con SweetAlert
        }
      );
      
    }

    getClientByCompany(): void {
      this.companyService.detailClient(this.groupName).subscribe(
        (data) => {
          this.roles = data; // Asigna los roles a la propiedad company.roles
          
        },
        (err) => {
          // Mostrar mensaje de error con SweetAlert
        }
      );
    }
  
    getClientRoles(): void {
      this.getClientByCompany();
    }

  }



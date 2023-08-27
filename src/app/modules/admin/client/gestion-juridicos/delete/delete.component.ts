import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Company } from '../model/company';
import { CompanyService } from 'app/services/companyService';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  uniqueKey: String = this.activatedRoute.snapshot.params['uniqueKey'];
  isSaved: boolean | null = null;
  errorMessage: string | null = null;

  company!: Company;
    constructor(
      private companyService: CompanyService,
      private router: Router,
      private activatedRoute: ActivatedRoute
    ) { }
  
    ngOnInit(): void {
      this.onDelete();
    }
  
    onDelete(): void {
      this.companyService.delete(this.uniqueKey, this.company).subscribe(
        data => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'El usuario ha sido eliminado correctamente.',
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
            text: 'Error al guardar el usuario. Por favor, inténtalo nuevamente.',
            icon: 'error'
          });
          
          this.isSaved = false;
          this.errorMessage = 'Error al guardar el usuario. Por favor, inténtalo nuevamente.';
        }
      );
    }
   

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'app/services/clienteService';
import Swal from 'sweetalert2';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  typeDocumentId: String = this.activatedRoute.snapshot.params['typeDocumentId'];
  documentId: String = this.activatedRoute.snapshot.params['documentId'];;
  isSaved: boolean | null = null;
  errorMessage: string | null = null;

  cliente!: Cliente;
    constructor(
      private clienteService: ClienteService,
      private router: Router,
      private activatedRoute: ActivatedRoute
    ) { }
  
    ngOnInit(): void {
      this.getCliente();
      this.onDelete();
    }
  
    onDelete(): void {
      this.clienteService.delete(this.typeDocumentId,this.documentId, this.cliente).subscribe(
        data => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'El usuario ha sido eliminado correctamente.',
            icon: 'success',
            
          }).then(() => {
            
            this.isSaved = true;
            this.errorMessage = null;
            // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
            this.router.navigate(['/admin/gestion-naturales']);
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
    getCliente(): void {
      //(this.activatedRoute.snapshot)
      const typeDocumentId = this.activatedRoute.snapshot.params['typeDocumentId'];
      const documentId = this.activatedRoute.snapshot.params['documentId'];
      //(this.typeDocumentId, this.documentId);
      this.clienteService.detail(typeDocumentId, documentId).subscribe(
        data => {
          this.cliente = data;
          //(this.cliente);
        },
        err => {
          this.router.navigate(['']);
        }
      );
    }

}

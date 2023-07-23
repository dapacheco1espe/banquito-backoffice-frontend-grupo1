import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'app/services/clienteService';
import { Cliente } from '../model/cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

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

    }

    onUpdate(): void {
      this.clienteService.update(this.typeDocumentId,this.documentId, this.cliente).subscribe(
        data => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'El usuario se ha actualizado correctamente.',
            icon: 'success',

          }).then(() => {

            this.isSaved = true;
            this.errorMessage = null;
            // Opcional: Puedes redirigir a otra página o realizar alguna acción adicional
            this.router.navigate(['/gestion/gestion-naturales']);
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
      console.log(this.activatedRoute.snapshot)
      const typeDocumentId = this.activatedRoute.snapshot.params['typeDocumentId'];
      const documentId = this.activatedRoute.snapshot.params['documentId'];
      console.log(this.typeDocumentId, this.documentId);
      this.clienteService.detail(typeDocumentId, documentId).subscribe(
        data => {
          this.cliente = data;
          console.log(this.cliente);
        },
        err => {
          this.router.navigate(['']);
        }
      );
    }


  }



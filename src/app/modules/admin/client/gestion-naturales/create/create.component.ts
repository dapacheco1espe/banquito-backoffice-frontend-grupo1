import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'app/services/clienteService';
import { Cliente } from '../model/cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  branchId!: String;
  typeDocumentId!: String;
  documentId!: String;
  firstName!: String;
  lastName!: String;
  gender!: String;
  birthDate!: String;
  emailAddress!: String;
  creationDate!: Date;
  activationDate!: Date;
  lastModifiedDate!: Date;
  role!: String;
  state!: String;
  closedDate!: Date;
  comments!: String;
  isSaved: boolean | null = null;
  errorMessage: string | null = null;

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    

  const cliente = new Cliente(this.branchId,this.typeDocumentId,this.documentId,this.firstName,this.lastName,this.gender,this.birthDate,this.emailAddress,this.role,this.comments);

    this.clienteService.create(cliente).subscribe(
      data => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'El usuario se ha guardado correctamente.',
          icon: 'success'
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

}

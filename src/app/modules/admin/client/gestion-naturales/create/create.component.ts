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
  documentId!: string;
  firstName!: String;
  lastName!: String;
  gender!: String;
  birthDate!: String;
  emailAddress!: string;
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
    // Validar que todos los campos estén llenos
    if (
      !this.branchId ||
      !this.typeDocumentId ||
      !this.documentId ||
      !this.firstName ||
      !this.lastName ||
      !this.gender ||
      !this.birthDate ||
      !this.emailAddress ||
      !this.role ||
      !this.comments
    ) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
        icon: 'error'
      });
      return;
    }

    // Validar formato de cédula (que sean solo números y 10 dígitos)
    if (!/^\d{10}$/.test(this.documentId)) {
      Swal.fire({
        title: 'Error',
        text: 'El número de cédula debe contener solo números y tener 10 dígitos.',
        icon: 'error'
      });
      return;
    }

    // Validar formato de correo electrónico
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.emailAddress)) {
      Swal.fire({
        title: 'Error',
        text: 'Ingrese una dirección de correo electrónico válida.',
        icon: 'error'
      });
      return;
    }

    // Si todos los campos son válidos, procedemos a crear el cliente
    const cliente = new Cliente(this.branchId, this.typeDocumentId, this.documentId, this.firstName, this.lastName,
      this.gender, this.birthDate, this.emailAddress, this.role, this.comments);

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

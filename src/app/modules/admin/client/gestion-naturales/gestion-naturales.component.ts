import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { ClienteService } from 'app/services/clienteService';
import Swal from 'sweetalert2';
import { Cliente } from './model/cliente';

@Component({
  selector: 'app-gestion-naturales',
  templateUrl: 'gestion-naturales.component.html',
  styleUrls: ['gestion-naturales.component.scss'],
  animations: fuseAnimations,
})
export class GestionNaturalesComponent implements OnInit {
  showNumberErrorMessage: boolean = false;
  cliente: Cliente | undefined;
  typeDocumentId!: String;
  documentId!: String;
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente(): void {
    this.clienteService.detail(this.typeDocumentId, this.documentId).subscribe(
      (data) => {
        this.cliente = data;
        //(this.cliente);
      },
      (err) => {
        // Mostrar mensaje de error con SweetAlert
      }
    );
  }
  buscarCliente(): void {
    this.clienteService.detail(this.typeDocumentId, this.documentId).subscribe(
      (data) => {
        this.cliente = data;
        //(this.cliente);
  
        // Mostrar mensaje de éxito con SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Cliente encontrado',
          text: 'La información del cliente ha sido cargada correctamente.',
          confirmButtonText: 'Aceptar',
        });
      },
      (err) => {
        // Mostrar mensaje de error con SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El cliente no pudo ser encontrado.',
          confirmButtonText: 'Aceptar',
        });
  
        this.router.navigate(['/gestion/gestion-naturales']);
      }
    );
  }
  onDocumentIdInput(event: any) {
    const inputValue = event.target.value;

    // Filtrar los caracteres no numéricos
    this.documentId = inputValue.replace(/[^0-9]/g, '');

    // Actualizar el estado para mostrar u ocultar el mensaje
    this.showNumberErrorMessage = inputValue !== this.documentId;
  }
}

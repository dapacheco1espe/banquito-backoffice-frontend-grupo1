import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Cliente } from './model/cliente';
import { ClienteService } from 'app/services/clienteService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gestion-naturales',
  templateUrl: 'gestion-naturales.component.html',
  styleUrls: ['gestion-naturales.component.scss'],
  animations: fuseAnimations,
})
export class GestionNaturalesComponent implements OnInit {
 
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
        console.log(this.cliente);
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
        console.log(this.cliente);
  
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
}

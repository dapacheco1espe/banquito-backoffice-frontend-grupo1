import { Component, OnInit } from "@angular/core";
import { Cliente } from "./model/cliente";
import { ClienteService } from "app/services/clienteService";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list',
  templateUrl: 'gestion-naturales.component.html',
  styleUrls: ['gestion-naturales.component.scss']
})
export class GestionNaturalesComponent implements OnInit {
 

  cliente: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
   
    
  ) { }

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente(): void {
    this.clienteService.list().subscribe(
      data => {
        this.cliente = data;
      },
      err => {
        
      }
    );
  }

  onDelete(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(id).subscribe(
          data => {
            Swal.fire(
              'OK Cliente Eliminado',
              data.message,
              'success'
            );
            this.getCliente();
          },
          err => {
            Swal.fire(
              'Error',
              err.error.message,
              'error'
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'El producto no ha sido eliminado',
          'error'
        );
      }
    });
  }
  
  
}

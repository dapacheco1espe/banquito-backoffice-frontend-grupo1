import { Component, OnInit } from "@angular/core";
import { Cliente } from "./model/cliente";
import { ClienteService } from "app/services/clienteService";
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from "@angular/forms";


@Component({
  selector: 'app-list',
  templateUrl: 'gestion-naturales.component.html',
  styleUrls: ['gestion-naturales.component.scss']
})
export class GestionNaturalesComponent implements OnInit {
 
  
  cliente: Cliente[] = [];
  filteredCliente: Cliente[] = [];
  searchForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
   
    
  ) {  this.searchForm = this.formBuilder.group({
    numeroDocumento: [''],
    nombreApellido: ['']
  });}

  ngOnInit(): void {

    this.getCliente();
  }

  getCliente(): void {
    this.clienteService.list().subscribe(
      data => {
        this.cliente = data;
        this.filteredCliente = data;
      },
      err => {
        
      }
    );
  }

  filterData(): void {
    const searchTerm = this.searchForm.get('numeroDocumento').value.toLowerCase();

    this.filteredCliente = this.cliente.filter(cli => {
      const matchNumeroDocumento = cli.numeroDocumento.toLowerCase().includes(searchTerm);

      return matchNumeroDocumento;
    });
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

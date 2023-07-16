import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from '../model/cliente';
import { FormGroup } from '@angular/forms';
import { ClienteService } from 'app/services/clienteService';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  title = 'data-table';
  searchTerm: string = '';
  filteredData: any[] = [];
  selectedRowIndex: number = -1;
  showButtons: boolean = false;
  showNav: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10;
  dataUrl: any[] = [];
  clientes: Cliente[] = [];
  filteredClientes: Cliente[] = [];
  searchForm: FormGroup;

  constructor(private clienteService: ClienteService 
  ) {
    this.clienteService.list().subscribe(
      (data: Cliente[]) => {
        console.log(data);
        this.clientes = data;
      },
      (err: any) => {
        // Manejar errores si es necesario
      }
    );
    
  }

  ngOnInit(): void {
  
  }

  getCliente(): void {
    this.clienteService.list().subscribe(
      data => {
        this.clientes = data;
      },
      err => {
        
      }
    );
  }

  filterData() {
    console.log(this.filteredData);
    this.filteredData = this.clientes.filter(
      
        (item) =>
           item.id
                .toFixed()
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.name
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.tipoDocumento
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.numeroDocumento
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.name
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.lastname
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.genero
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.fechaNacimiento
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.direction
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.rol
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.estado
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase())

    );
    this.showButtons = false;
}

  rowClick(index: number) {
    this.selectedRowIndex = index;
    this.showButtons = true;
    console.log(this.selectedRowIndex);
  }

  get displayedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.clientes
        .filter(
            (item) =>
            item.id
            .toFixed()
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
        item.name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
        item.tipoDocumento
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
        item.numeroDocumento
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
        item.name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
        item.lastname
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
        item.genero
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
        item.fechaNacimiento
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
        item.direction
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
        item.rol
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
        item.estado
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        )
        .slice(startIndex, endIndex);
}

get totalPages(): number[] {
  console.log(
      Array(Math.ceil(this.clientes.length / this.pageSize))
          .fill(0)
          .map((_, i) => i + 1)
  );

  return Array(Math.ceil(this.clientes.length / this.pageSize))
      .fill(0)
      .map((_, i) => i + 1);
}

setCurrentPage(page: number) {
  this.currentPage = page;
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
          (data: any) => {
            Swal.fire(
              'OK Cliente Eliminado',
              data.message,
              'success'
            );
            this.getCliente();
          },
          (err: any) => {
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
          'El cliente no ha sido eliminado',
          'error'
        );
      }
    });
  }
}

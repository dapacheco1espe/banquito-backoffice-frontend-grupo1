import { Component, OnInit } from "@angular/core";
import { fuseAnimations } from '@fuse/animations';


import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { Cliente } from "./model1/cliente";
import { ClienteService } from "app/services/companyService";

@Component({
  selector: 'app-gestion-juridicos',
  templateUrl: 'gestion-juridicos.component.html',
  styleUrls: ['gestion-juridicos.component.scss'],
  animations: fuseAnimations
})
export class GestionJuridicosComponent implements OnInit {
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
           item.branchId
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.locationId
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.groupName
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.emailAddress
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.phoneNumber
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.line1
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.line2
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.latitude
                .toFixed()
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.longitude
                .toFixed()
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.comments
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
            item.state
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
          item.branchId
               .toLowerCase()
               .includes(this.searchTerm.toLowerCase()) ||
           item.locationId
               .toLowerCase()
               .includes(this.searchTerm.toLowerCase()) ||
           item.groupName
               .toLowerCase()
               .includes(this.searchTerm.toLowerCase()) ||
           item.emailAddress
               .toLowerCase()
               .includes(this.searchTerm.toLowerCase()) ||
           item.phoneNumber
               .toLowerCase()
               .includes(this.searchTerm.toLowerCase()) ||
           item.line1
               .toLowerCase()
               .includes(this.searchTerm.toLowerCase()) ||
           item.line2
               .toLowerCase()
               .includes(this.searchTerm.toLowerCase()) ||
           item.latitude
               .toFixed()
               .toLowerCase()
               .includes(this.searchTerm.toLowerCase()) ||
           item.longitude
               .toFixed()
               .toLowerCase()
               .includes(this.searchTerm.toLowerCase()) ||
           item.comments
               .toLowerCase()
               .includes(this.searchTerm.toLowerCase()) ||
           item.state
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

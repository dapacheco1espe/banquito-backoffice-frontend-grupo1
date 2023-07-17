import { Component, OnInit } from "@angular/core";
import { fuseAnimations } from '@fuse/animations';


import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import {Company} from "./model/company";
import {CompanyService} from "app/services/companyService";
import { Router } from "@angular/router";

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
  company: Company[] = [];
  filteredCompany: Company[] = [];
  searchForm: FormGroup;
 
  isSaved: boolean | null = null;
  errorMessage: string | null = null;
  constructor(private clienteService: CompanyService
    ) {
    this.clienteService.list().subscribe(
      (data: Company[]) => {
        console.log(data);
        this.company = data;
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
        this.company = data;
      },
      err => {
        
      }
    );
  }

  filterData() {
    console.log(this.filteredData);
    this.filteredData = this.company.filter(
      (item) =>
        item.uniqueKey.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.groupName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.emailAddress.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.phoneNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.line1.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.line2.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.latitude.toFixed().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.longitude.toFixed().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.state.toLowerCase().includes(this.searchTerm.toLowerCase())
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
    return this.company.filter(
      (item) =>
        item.groupName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.emailAddress.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.phoneNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.line1.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.line2.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.latitude.toFixed().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.longitude.toFixed().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.state.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
      .slice(startIndex, endIndex);
  }

  get totalPages(): number[] {
    console.log(
      Array(Math.ceil(this.company.length / this.pageSize))
        .fill(0)
        .map((_, i) => i + 1)
    );

    return Array(Math.ceil(this.company.length / this.pageSize))
      .fill(0)
      .map((_, i) => i + 1);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }
  

}

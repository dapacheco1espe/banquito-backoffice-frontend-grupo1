import { Component, OnInit } from '@angular/core';
import { AgencyService } from 'app/services/agency.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-agency',
    templateUrl: './agency.component.html',
    styleUrls: ['./agency.component.scss'],
    animations: fuseAnimations,
})
export class AgencyComponent implements OnInit {
    title = 'data-table';
    searchTerm: string = '';
    filteredData: any[] = [];
    selectedRowIndex: number = -1;
    showButtons: boolean = false;
    showNav: boolean = false;
    currentPage: number = 1;
    pageSize: number = 5;
    data: any[] = [
        {
            nombre: 'Maverick',
            email: 'mrpaucar@espe.edu.ec',
            rol: 'Administrador',
        },
        {
            nombre: 'David',
            email: 'datamayo@espe.edu.ec',
            rol: 'Administrador',
        },
    ];
    dataUrl: any[] = [];
    constructor(private service: AgencyService) {
        this.service.getData().subscribe((response: any) => {
            console.log(response);
            this.dataUrl = response;
        });
    }

    ngOnInit(): void {}

    filterData() {
        this.filteredData = this.dataUrl.filter(
            (item) =>
                item.name
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
                item.line2.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.showButtons = false;
    }

    rowClick(index: number) {
        this.selectedRowIndex = index;
        this.showButtons = true;
        console.log(this.selectedRowIndex);
    }

    resetSelection() {
        this.selectedRowIndex = -1;
        this.showButtons = false;
    }

    get displayedData(): any[] {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.dataUrl
            .filter(
                (item) =>
                    item.name
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
                        .includes(this.searchTerm.toLowerCase())
            )
            .slice(startIndex, endIndex);
    }

    get totalPages(): number[] {
        console.log(
            Array(Math.ceil(this.dataUrl.length / this.pageSize))
                .fill(0)
                .map((_, i) => i + 1)
        );

        return Array(Math.ceil(this.dataUrl.length / this.pageSize))
            .fill(0)
            .map((_, i) => i + 1);
    }

    setCurrentPage(page: number) {
        this.currentPage = page;
    }
}

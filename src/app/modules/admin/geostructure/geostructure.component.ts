import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { GeostructureService } from './geostructure.service';

@Component({
    selector: 'app-geostructure',
    templateUrl: './geostructure.component.html',
    styleUrls: ['./geostructure.component.scss'],
    animations: fuseAnimations,
})
export class GeostructureComponent implements OnInit {
    title = 'data-table';
    searchTerm: string = '';
    filteredData: any[] = [];
    selectedRowIndex: number = -1;
    showButtons: boolean = false;
    showNav: boolean = false;
    currentPage: number = 1;
    pageSize: number = 5;
    dataUrl: any[] = [];
    constructor(private service: GeostructureService) {
        this.service.getData().subscribe((response: any) => {
            console.log(response);
            this.dataUrl = response;
        });
    }

    ngOnInit(): void {}

    filterData() {
        this.filteredData = this.dataUrl.filter(
            (item) =>
                item.countryId
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase()) ||
                item.name
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase()) ||
                item.phoneCode
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase())
        );
        this.showButtons = false;
    }

    get displayedData(): any[] {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.dataUrl
            .filter(
                (item) =>
                    item.countryId
                        .toLowerCase()
                        .includes(this.searchTerm.toLowerCase()) ||
                    item.name
                        .toLowerCase()
                        .includes(this.searchTerm.toLowerCase()) ||
                    item.phoneCode
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

    rowClick(index: number) {
        this.selectedRowIndex = index;
        this.showButtons = true;
        console.log(this.selectedRowIndex);
    }

    resetSelection() {
        this.selectedRowIndex = -1;
        this.showButtons = false;
    }
}

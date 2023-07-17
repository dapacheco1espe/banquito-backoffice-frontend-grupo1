import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { GeostructureService } from 'app/services/geostructure.service';
import { Geostructure } from './geostructure-model/geostructure';

@Component({
    selector: 'app-geostructure',
    templateUrl: './geostructure.component.html',
    styleUrls: ['./geostructure.component.scss'],
    animations: fuseAnimations,
})
export class GeostructureComponent implements OnInit {
    geostructures: Geostructure[] = [];
    filteredGeostructure: Geostructure[] = [];
    searchTerm: string = '';
    selectedRowIndex: number = -1;
    showButtons: boolean = false;
    showNav: boolean = false;
    currentPage: number = 1;
    pageSize: number = 5;

    constructor(private geostructureService: GeostructureService) {}

    ngOnInit(): void {
        this.getGeostructures();
    }

    // Traer agencias existentes
    getGeostructures(): void {
        this.geostructureService.list().subscribe((data) => {
            this.geostructures = data;
        });
    }

    filterData() {
        this.filteredGeostructure = this.geostructures.filter(
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
        return this.geostructures
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
            Array(Math.ceil(this.geostructures.length / this.pageSize))
                .fill(0)
                .map((_, i) => i + 1)
        );

        return Array(Math.ceil(this.geostructures.length / this.pageSize))
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

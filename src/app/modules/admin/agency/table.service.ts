import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TableService {
    private baseURL = 'https://64b1a828062767bc4826815a.mockapi.io/api/v1/agencies';
    constructor(private http: HttpClient) {}

    getData() {
        return this.http.get(this.baseURL);
    }
}

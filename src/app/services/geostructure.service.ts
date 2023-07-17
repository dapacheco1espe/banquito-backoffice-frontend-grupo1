import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Geostructure } from 'app/modules/admin/geostructure/geostructure-model/geostructure';

@Injectable({
    providedIn: 'root',
})
export class GeostructureService {
    private baseURL = environment.apiResrURL + '/geostructure';
    constructor(private http: HttpClient) {}

    public list(): Observable<Geostructure[]> {
        return this.http.get<Geostructure[]>(this.baseURL);
    }

    public create(geostructure: Geostructure): Observable<any> {
        return this.http.post<any>(this.baseURL, geostructure);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Geostructure } from 'app/modules/admin/client/geostructure/geostructure-model/geostructure';

@Injectable({
    providedIn: 'root',
})
export class GeostructureService {
    private baseURL = environment.apiResrURL + '/api/v1';
    constructor(private http: HttpClient) {}

    public list(): Observable<Geostructure[]> {
        return this.http.get<Geostructure[]>(
            this.baseURL + '/geoCountry/findCountriesList'
        );
    }

    public getGeostructureByCode(code: any): Observable<Geostructure> {
        return this.http.get<Geostructure>(
            this.baseURL + '/geoCountry/findByCountryCode/' + code
        );
    }

    public getGeoById(uuid: string): Observable<any> {
        return this.http.get<any>(
            this.baseURL + '/geoLocation/findByUuid/' + uuid
        );
    }

    public create(geostructure: Geostructure): Observable<any> {
        return this.http.post<any>(
            this.baseURL + '/geoCountry/create',
            geostructure
        );
    }

    public detail(id: any): Observable<any> {
        return this.http.get(
            this.baseURL + '/geoCountry/findByCountryCode/' + `${id}`
        );
    }

    public update(code: any, country: any): Observable<any> {
        return this.http.put(
            this.baseURL + '/geoCountry/update/' + code,
            country
        );
    }

    public delete(code: any): Observable<any> {
        return this.http.put(
            this.baseURL + '/geoCountry/deleteLogic/' + code,
            code
        );
    }
}

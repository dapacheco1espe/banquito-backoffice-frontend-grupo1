import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Agency } from 'app/modules/admin/agency/agency-model/agency';
import { Geolocation } from 'app/modules/admin/geostructure/geostructure-model/geolocation';

@Injectable({
    providedIn: 'root',
})
export class AgencyService {
    private baseURL = environment.administrationAPIUrl + '/api/v1';
    constructor(private http: HttpClient) {}

    public list(uuid: any): Observable<Agency[]> {
        return this.http.get<Agency[]>(
            this.baseURL +
                '/bankEntity/Branches-location-state/' +
                uuid +
                '/ACT'
        );
    }

    public listProv(): Observable<Geolocation[]> {
        return this.http.get<Geolocation[]>(
            this.baseURL + '/geoLocation/countryCode-levelCode/ECU/1'
        );
    }

    public listAllAgencies(): Observable<Agency[]> {
        return this.http.get<Agency[]>(
            this.baseURL + '/bankEntity/findAllBranches/ACT'
        );
    }

    public listCant(prov: string): Observable<Geolocation[]> {
        return this.http.get<Geolocation[]>(
            this.baseURL +
                '/geoLocation/CountryCodeAndParentName?countryCode=ECU&parentName=' +
                prov
        );
    }

    public listParr(cant: string): Observable<Geolocation[]> {
        return this.http.get<Geolocation[]>(
            this.baseURL +
                '/geoLocation/CountryCodeAndParentName?countryCode=ECU&parentName=' +
                cant
        );
    }

    public create(agency: any): Observable<any> {
        return this.http.post<any>(
            this.baseURL + '/bankEntity/addBranch',
            agency
        );
    }

    public detail(id: any): Observable<any> {
        return this.http.get(
            this.baseURL + '/bankEntity/findBranch' + `/${id}`
        );
    }

    public update(code: any, agency: any): Observable<any> {
        return this.http.put(
            this.baseURL + '/bankEntity/updateBranch/' + code,
            agency
        );
    }

    public delete(code: any): Observable<any> {
        return this.http.put(
            this.baseURL + '/bankEntity/deleteBranch/' + code,
            null
        );
    }
    
    
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Agency } from 'app/modules/admin/agency/agency-model/agency';
import { Geolocation } from 'app/modules/admin/geostructure/geostructure-model/geolocation';

@Injectable({
    providedIn: 'root',
})
export class AgencyService {
    private baseURL =
        environment.apiResrURL;
    constructor(private http: HttpClient) {}

    public list(): Observable<Agency[]> {
        return this.http.get<Agency[]>(this.baseURL + '/bankEntity/findAllBranches/ACT');
    }

    public listProv(): Observable<Geolocation[]> {
        return this.http.get<Geolocation[]>(this.baseURL + '/geoLocation/countryCode-levelCode/ECU/1');
    }

    public listCant(prov: string): Observable<Geolocation[]> {
        console.log(this.baseURL + '/geoLocation/CountryCodeAndParentName?countryCode=ECU&parentName=' + prov);
        return this.http.get<Geolocation[]>(this.baseURL + '/geoLocation/CountryCodeAndParentName?countryCode=ECU&parentName=' + prov);
    }

    public listParr(cant: string): Observable<Geolocation[]> {
        return this.http.get<Geolocation[]>(this.baseURL + '/geoLocation/CountryCodeAndParentName?countryCode=ECU&parentName=' + cant);
    }

    public create(agency: Agency): Observable<any> {
        return this.http.post<any>(this.baseURL, agency);
    }

    public detail(id: number): Observable<any> {
        return this.http.get(this.baseURL + `/${id}`);
    }

    public update(id: number, agency: Agency): Observable<any> {
        return this.http.put(this.baseURL + `/${id}`, agency);
    }
}

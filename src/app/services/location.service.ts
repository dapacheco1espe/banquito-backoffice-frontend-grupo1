import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Location } from 'app/modules/admin/location/location-model/location';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    private baseURL = environment.administrationAPIUrl + '/api/v1';
    constructor(private http: HttpClient) {}

    public list(countryCode: any, level: any): Observable<Location[]> {
        return this.http.get<Location[]>(
            this.baseURL +
                '/geoLocation/countryCode-levelCode/' +
                countryCode +
                '/' +
                level
        );
    }
    public listAllLocations(): Observable<Location[]> {
        return this.http.get<Location[]>(
            this.baseURL + '/geoLocation/countryCode-levelCode/ECU/1'
        );
    }

    public create(location: any): Observable<any> {
        return this.http.post<any>(
            this.baseURL + '/geoLocation/create',
            location
        );
    }

    public detail(uuid: any): Observable<Location> {
        return this.http.get<Location>(
            this.baseURL + '/geoLocation/findByUuid/' + uuid
        );
    }

    public update(code: any, location: any): Observable<any> {
        return this.http.put(
            this.baseURL + '/geoLocation/update/' + code,
            location
        );
    }

    public delete(code: any): Observable<any> {
        return this.http.delete(this.baseURL + '/geoLocation/delete/' + code);
    }
}

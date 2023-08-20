import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from 'app/modules/admin/client/location/location-model/location';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    private baseURL = environment.apiResrURL1;
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
            this.baseURL + '/api/v1/geoLocation/countryCode-levelCode/ECU/1'
        );
    }

    public create(location: any): Observable<any> {
        return this.http.post<any>(
            this.baseURL + '/api/v1/geoLocation/create',
            location
        );
    }
   
}

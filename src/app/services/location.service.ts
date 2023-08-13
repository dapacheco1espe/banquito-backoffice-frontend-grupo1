import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Location } from 'app/modules/admin/client/location/location-model/location';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    private baseURL = environment.apiResrURL + '/api/v1';
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

    public create(location: any): Observable<any> {
        return this.http.post<any>(
            this.baseURL + '/geoLocation/create',
            location
        );
    }
}

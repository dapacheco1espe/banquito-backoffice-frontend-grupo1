import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Location } from 'app/modules/admin/client/location/location-model/location';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    private baseURL = environment.administrationAPIUrl;
    constructor(private http: HttpClient) {}

    public list(countryCode: any, level: any): Observable<Location[]> {
        return this.http.get<Location[]>(
            this.baseURL +
                '/api/v1/geoLocation/countryCode-levelCode/' +
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

    public detail(uuid: any): Observable<Location> {
        return this.http.get<Location>(
            this.baseURL + '/api/v1/geoLocation/findByUuid/' + uuid
        );
    }
}

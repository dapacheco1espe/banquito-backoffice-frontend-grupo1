import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Location } from 'app/modules/admin/location/location-model/location';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    private baseURL = environment.apiResrURL;
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
}

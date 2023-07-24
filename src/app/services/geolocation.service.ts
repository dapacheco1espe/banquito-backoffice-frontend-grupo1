import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GeolocationService {
    private baseURL = environment.apiResrURL + '/geoLocation';
    constructor(private http: HttpClient) {}
    public getGeoById(uuid: string): Observable<Geolocation> {
        return this.http.get<Geolocation>(this.baseURL + '/findByUuid/' + uuid);
    }
}

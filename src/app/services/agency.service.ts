import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AgencyService {
    private baseURL = environment.apiResrURL + '/agencies';
    constructor(private http: HttpClient) {}

    getData() {
        return this.http.get(this.baseURL);
    }
    public detail(id: number): Observable<any> {
        return this.http.get(this.baseURL + `/${id}`);
    }
}

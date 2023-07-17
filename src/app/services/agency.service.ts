import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Agency } from 'app/modules/admin/agency/agency-model/agency';

@Injectable({
    providedIn: 'root',
})
export class AgencyService {
    private baseURL = environment.apiResrURL + '/agencies';
    constructor(private http: HttpClient) {}

    public list(): Observable<Agency[]> {
        return this.http.get<Agency[]>(this.baseURL);
    }

    public create(agency: Agency): Observable<any> {
        return this.http.post<any>(this.baseURL, agency);
    }

    public detail(id: number): Observable<any> {
        return this.http.get(this.baseURL + `/${id}`);
    }
}

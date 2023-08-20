import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Holiday } from 'app/modules/admin/holiday/holiday-model/holiday';

@Injectable({
    providedIn: 'root',
})
export class HolidayService {
    private baseURL = environment.administrationAPIUrl + '/api/v1';
    constructor(private http: HttpClient) {}

    public list(countryId: any): Observable<Holiday[]> {
        return this.http.get<Holiday[]>(
            this.baseURL + '/holiday/findByCountryCode/' + countryId
        );
    }

    public create(holiday: any): Observable<any> {
        return this.http.post<any>(this.baseURL + '/holiday/create', holiday);
    }

    public detail(uuid: any): Observable<Holiday> {
        return this.http.get<Holiday>(
            this.baseURL + '/holiday/findByUuid/' + uuid
        );
    }

    public update(uuid: any, holiday: any): Observable<any> {
        return this.http.put(this.baseURL + '/holiday/update/' + uuid, holiday);
    }
}

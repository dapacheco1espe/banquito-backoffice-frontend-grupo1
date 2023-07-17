import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Company } from 'app/modules/admin/client/gestion-juridicos/model/company';



@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  

  companyURL = environment.apiResrURL + '/api/v2/companies';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.companyURL);
  }

  public create(company: Company): Observable<any> {
    return this.httpClient.post<any>(this.companyURL, company);
  }
  public detail(uniqueKey: number): Observable<Company> {
    return this.httpClient.get<Company>(this.companyURL + `/${uniqueKey}`);
  }
  public update(uniqueKey: number, company: Company): Observable<any> {
    return this.httpClient.put<any>(this.companyURL + `/${uniqueKey}`, company);
  }
  public delete(uniqueKey: number): Observable<any> {
    return this.httpClient.delete<any>(this.companyURL + `/${uniqueKey}`);
  }
}
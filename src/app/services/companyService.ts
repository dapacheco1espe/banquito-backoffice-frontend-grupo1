import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Company } from 'app/modules/admin/client/gestion-juridicos/model/company';
import { CompanyMember } from 'app/modules/admin/client/gestion-juridicos/model/companyMember';



@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  

  companyURL = environment.apiResrURL + '/api/v2/companies';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.companyURL);
  }
  public detail(groupName: String,): Observable<Company> {
    return this.httpClient.get<Company>(this.companyURL+`/${groupName}`);
  }
  public create(company: Company): Observable<any> {
    return this.httpClient.post<any>(this.companyURL, company);
  }
  
  public update(uniqueKey: String, company: Company): Observable<any> {
    return this.httpClient.put<any>(`${this.companyURL}/${'updateCompany'}/${uniqueKey}`, company);
  }
  public delete(uniqueKey: String, company: Company): Observable<any> {
    return this.httpClient.put<any>(`${this.companyURL}/${'deleteCompany'}/${uniqueKey}`, company);
  }
  public createMember(
    groupName: String,
    //aqui adjuntas en body request le adjuntas un array de telefonos
    memberList:CompanyMember[]

): Observable<Company> {
  return this.httpClient.put<Company>(`${this.companyURL}/${'addMember'}/${groupName}`, memberList);
}
 
public detailClient(groupName: String,): Observable<Company> {
    return this.httpClient.get<Company>(`${this.companyURL}/${'membersById'}/${groupName}`);
  }
}
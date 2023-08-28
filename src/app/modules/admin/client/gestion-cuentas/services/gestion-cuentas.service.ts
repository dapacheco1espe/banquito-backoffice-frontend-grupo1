
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AccountRQ } from '../Models/AccountRQ';

@Injectable({
  providedIn: 'root'
})
export class GestionCuentasService {
  private _baseURL:string ;
  constructor(private _http:HttpClient) {
    this._baseURL = environment.apiURLClient;
  }

  public getCompanyByGroupName(groupName:string):Observable<any>{
    return this._http.get(`${this._baseURL}/v2/companies/${groupName}`);
  }

  public createCompany(accountRQ:AccountRQ):Observable<any>{
    this._baseURL = environment.apiURLAccounts;
    return this._http.post(`${this._baseURL}/v1/accounts`,accountRQ);
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionCuentasService {
  private _baseURL:string ;
  private _company
  constructor(private _http:HttpClient) {
    this._baseURL = environment.apiURLClient;
  }

  public getCompanyByGroupName(groupName:string):Observable<any>{
    return this._http.get(`${this._baseURL}/v2/companies/${groupName}`);
  }
}

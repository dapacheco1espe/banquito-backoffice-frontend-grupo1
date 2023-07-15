import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Cliente } from '../modules/admin/client/gestion-naturales/model/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  

  clienteURL = environment.apiResrURL + '/cliente';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.clienteURL);
  }

  public create(cliente: Cliente): Observable<any> {
    return this.httpClient.post<any>(this.clienteURL, cliente);
  }
  public detail(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.clienteURL + `/${id}`);
  }
  public update(id: number, cliente: Cliente): Observable<any> {
    return this.httpClient.put<any>(this.clienteURL + `/${id}`, cliente);
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.clienteURL + `/${id}`);
  }
}
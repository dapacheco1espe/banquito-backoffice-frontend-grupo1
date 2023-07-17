import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Cliente } from 'app/modules/admin/client/gestion-juridicos/model1/cliente';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  

  clienteURL = environment.apiResrURL + '/api/v2/companies/MyGroup';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.clienteURL);
  }

  public create(cliente: Cliente): Observable<any> {
    return this.httpClient.post<any>(this.clienteURL, cliente);
  }
  public detail(uniqueKey: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.clienteURL + `/${uniqueKey}`);
  }
  public update(uniqueKey: number, cliente: Cliente): Observable<any> {
    return this.httpClient.put<any>(this.clienteURL + `/${uniqueKey}`, cliente);
  }
  public delete(uniqueKey: number): Observable<any> {
    return this.httpClient.delete<any>(this.clienteURL + `/${uniqueKey}`);
  }
}
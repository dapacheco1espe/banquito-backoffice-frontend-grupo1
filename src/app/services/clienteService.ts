import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Cliente } from '../modules/admin/client/gestion-naturales/model/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  

  clienteURL = environment.apiResrURL + '/api/v2/clients';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.clienteURL);
  }

  public detail(typeDocumentId: String, documentId: String): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.clienteURL+`/${typeDocumentId}/${documentId}`);
  }
  public create(cliente: Cliente): Observable<any> {
    return this.httpClient.post<any>(this.clienteURL, cliente);
  }
  public update(typeDocumentId: String, documentId: String, cliente: Cliente): Observable<any> {
    return this.httpClient.put<any>(`${this.clienteURL}/${'update'}/${typeDocumentId}/${documentId}`, cliente);
  }  
  public delete(typeDocumentId: String, documentId: String, cliente: Cliente): Observable<any> {
    return this.httpClient.put<any>(`${this.clienteURL}/${'deleteClient'}/${typeDocumentId}/${documentId}`, cliente);
  }
  public createPhone(typeDocumentId: String, documentId: String, cliente: Cliente): Observable<any> {
    return this.httpClient.put<any>(`${this.clienteURL}/${'phone'}/${typeDocumentId}/${documentId}`, cliente);
  }
}
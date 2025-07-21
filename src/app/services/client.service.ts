import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Client } from '../interfaces/client';
import { Pageable } from '../interfaces/pageable';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
   private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number): Observable<Pageable<Client>> {
    let params: any = {
      'page': page,
      'size': size
    };
    return this.http.get<Pageable<Client>>(`${this.apiUrl}/clients`, { params });
  }

  search(searchFor: string): Observable<Client[]> {
    const params = {
      "searchFor": searchFor
    };
    return this.http.get<Client[]>(`${this.apiUrl}/clients/search`, { params });
  }

  getByEmail(email: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/clients/email/${email}`);
  }

  get(clientId: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/clients/${clientId}`);
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients`, client);
  }

  update(clientId: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/clients/${clientId}`, client);
  }

  delete(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clients/${clientId}`);
  }
}

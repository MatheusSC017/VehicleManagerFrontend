import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
   private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  getClientByEmail(email: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/clients/email/${email}`);
  }

  getClient(clientId: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/clients/${clientId}`);
  }

  createClient(client: Client): Observable<Client> {
    const formData = new FormData();

    formData.append('firstName', client.firstName);
    formData.append('lastName', client.lastName);
    formData.append('email', client.email);
    formData.append('phone', client.phone);

    return this.http.post<Client>(`${this.apiUrl}/clients`, formData);
  }

  updateClient(clientId: number, client: Client): Observable<Client> {
    const formData = new FormData();

    formData.append('firstName', client.firstName);
    formData.append('lastName', client.lastName);
    formData.append('email', client.email);
    formData.append('phone', client.phone);
    return this.http.put<Client>(`${this.apiUrl}/clients/${clientId}`, formData);
  }

  deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clients/${clientId}`);
  }
}

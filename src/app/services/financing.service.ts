import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Financing } from '../interfaces/financing';
import { Pageable } from '../interfaces/pageable';

@Injectable({
  providedIn: 'root'
})
export class FinancingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number): Observable<Pageable<Financing>> {
    let params: any = {
      'page': page,
      'size': size
    };
    return this.http.get<Pageable<Financing>>(`${this.apiUrl}/financings`, { params });
  }

  get(financingId: number): Observable<Financing> {
    return this.http.get<Financing>(`${this.apiUrl}/financings/${financingId}`)
  }

  getByVehicleId(vehicleId: number): Observable<Financing> {
    return this.http.get<Financing>(`${this.apiUrl}/financings/vehicle/${vehicleId}`)
  }

  create(financing: Financing): Observable<Financing> {
    return this.http.post<Financing>(`${this.apiUrl}/financings`, financing);
  }

  update(financingId: number, financing: Financing): Observable<Financing> {
    return this.http.put<Financing>(`${this.apiUrl}/financings/${financingId}`, financing);
  }

  updateStatus(financingId: number, status: String): Observable<void> {
    let financingRequest: any = {
      'status': status,
    };
    return this.http.patch<void>(`${this.apiUrl}/financings/${financingId}/status`, financingRequest);
  }

}

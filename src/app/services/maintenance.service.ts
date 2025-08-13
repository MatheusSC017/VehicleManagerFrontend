import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Pageable } from '../interfaces/pageable';
import { Observable } from 'rxjs';
import { Maintenance } from '../interfaces/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number): Observable<Pageable<Maintenance>> {
    let params: any = {
      'page': page,
      'size': size
    };
    return this.http.get<Pageable<Maintenance>>(`${this.apiUrl}/maintenances`, { params });
  }

  getAllByVehicle(vehicleId: number): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(`${this.apiUrl}/maintenances/vehicle/${vehicleId}`,);
  }

  get(saleId: number): Observable<Maintenance> {
    return this.http.get<Maintenance>(`${this.apiUrl}/maintenances/${saleId}`)
  }

  create(vehicleId: number, additionalInfo: string): Observable<Maintenance> {
    let requestBody: any = {
      'vehicleId': vehicleId,
      'additionalInfo': additionalInfo
    };
    return this.http.post<Maintenance>(`${this.apiUrl}/maintenances`, requestBody);
  }

  delete(maintenanceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/maintenances/${maintenanceId}`);
  }

}

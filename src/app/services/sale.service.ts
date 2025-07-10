import { Injectable } from '@angular/core';
import { Client } from '../interfaces/client';
import { VehicleMinimal } from '../interfaces/vehicle-minimal';
import { Sale } from '../interfaces/sale';
import { Pageable } from '../interfaces/pageable';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number): Observable<Pageable<Sale>> {
    let params: any = {
      'page': page,
      'size': size
    };
    return this.http.get<Pageable<Sale>>(`${this.apiUrl}/sales`, { params });
  }

  getAllByVehicle(vehicleId: number): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/sales/vehicle/${vehicleId}`,);
  }

  get(saleId: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.apiUrl}/sales/${saleId}`)
  }

  create(client: Client, vehicle: VehicleMinimal, status: string): Observable<Sale> {
    const saleRequest = {
      "client": client,
      "vehicle": vehicle,
      "status": status
    }
    return this.http.post<Sale>(`${this.apiUrl}/sales`, saleRequest);
  }

  update(saleId: number, client: Client, vehicle: VehicleMinimal, status: string): Observable<Sale> {
    const saleRequest = {
      "client": client,
      "vehicle": vehicle,
      "status": status
    }
    return this.http.put<Sale>(`${this.apiUrl}/sales/${saleId}`, saleRequest);
  }

}

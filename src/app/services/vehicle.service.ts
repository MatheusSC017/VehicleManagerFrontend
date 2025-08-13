import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Vehicle } from '../interfaces/vehicle';
import { VehicleMultImages } from '../interfaces/vehicle-mult-images';
import { Pageable } from '../interfaces/pageable';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllWithImages(params: any): Observable<Pageable<Vehicle>> {
    return this.http.get<Pageable<Vehicle>>(`${this.apiUrl}/vehicles/images`, { params });
  }

  getAll(params: any): Observable<Pageable<Vehicle>> {
    return this.http.get<Pageable<Vehicle>>(`${this.apiUrl}/vehicles`, { params });
  }

  search(searchFor: string): Observable<Vehicle[]> {
    const params = {
      "searchFor": searchFor
    };
    return this.http.get<Vehicle[]>(`${this.apiUrl}/vehicles/search`, { params });
  }

  getByChassi(chassi: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/vehicles/chassi/${chassi}`)
  }

  getWithImages(vehicleId: number): Observable<VehicleMultImages> {
    return this.http.get<VehicleMultImages>(`${this.apiUrl}/vehicles/${vehicleId}`);
  }

  create(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}/vehicles`, vehicle);
  }

  update(vehicleId: number, vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/vehicles/${vehicleId}`, vehicle);
  }

  delete(vehicleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vehicles/${vehicleId}`);
  }
  
}

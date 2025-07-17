import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
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
    const formData = new FormData();

    formData.append('vehicleType', vehicle.vehicleType);
    formData.append('vehicleStatus', vehicle.vehicleStatus);
    formData.append('brand', vehicle.brand);
    formData.append('model', vehicle.model);
    formData.append('year', vehicle.year.toString());
    formData.append('color', vehicle.color);
    formData.append('plate', vehicle.plate);
    formData.append('chassi', vehicle.chassi);
    formData.append('mileage', vehicle.mileage.toString());
    formData.append('price', vehicle.price.toString());
    formData.append('vehicleFuel', vehicle.vehicleFuel);
    formData.append('vehicleChange', vehicle.vehicleChange);
    formData.append('doors', vehicle.doors.toString());
    formData.append('motor', vehicle.motor);
    formData.append('power', vehicle.power);

    return this.http.post<Vehicle>(`${this.apiUrl}/vehicles`, formData);
  }

  update(vehicleId: number, vehicle: VehicleMultImages): Observable<VehicleMultImages> {
    const formData = new FormData();

    formData.append('vehicleType', vehicle.vehicleType);
    formData.append('vehicleStatus', vehicle.vehicleStatus);
    formData.append('brand', vehicle.brand);
    formData.append('model', vehicle.model);
    formData.append('year', vehicle.year.toString());
    formData.append('color', vehicle.color);
    formData.append('plate', vehicle.plate);
    formData.append('chassi', vehicle.chassi);
    formData.append('mileage', vehicle.mileage.toString());
    formData.append('price', vehicle.price.toString());
    formData.append('vehicleFuel', vehicle.vehicleFuel);
    formData.append('vehicleChange', vehicle.vehicleChange);
    formData.append('doors', vehicle.doors.toString());
    formData.append('motor', vehicle.motor);
    formData.append('power', vehicle.power);

    return this.http.put<VehicleMultImages>(`${this.apiUrl}/vehicles/${vehicleId}`, formData);
  }

  delete(vehicleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vehicles/${vehicleId}`);
  }
  
}

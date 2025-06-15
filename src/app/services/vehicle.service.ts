import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Vehicle } from '../interfaces/Vehicle';
import { VehicleMultImages } from '../interfaces/VehicleMultImages';
import { Pageable } from '../interfaces/Pageable';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVehicles(params: any): Observable<Pageable<Vehicle>> {
    return this.http.get<Pageable<Vehicle>>(`${this.apiUrl}/vehicles`, { params });
  }

  getVehicleById(id: number): Observable<VehicleMultImages> {
    return this.http.get<VehicleMultImages>(`${this.apiUrl}/vehicles/${id}`);
  }

  createVehicle(vehicle: VehicleMultImages, images: File[]): Observable<VehicleMultImages> {
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
    for (let i = 0; i < images.length; i++) {
      formData.append('imagesInput', images[i]);
    }

    return this.http.post<VehicleMultImages>(`${this.apiUrl}/vehicles`, formData);
  }

  updateVehicle(vehicle: any, images: File[], selectedImages: number[]): Observable<any> {
    const formData = new FormData();
    for (let key in vehicle) {
      formData.append(key, vehicle[key]);
    }
    images.forEach(image => formData.append('imagesInput', image));
    selectedImages.forEach(id => formData.append('selectedImages', id.toString()));
    return this.http.post(`${this.apiUrl}/vehicles/${vehicle.id}`, formData);
  }

  deleteVehicle(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicles/${id}`);
  }
}

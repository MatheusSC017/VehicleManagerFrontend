import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVehicles(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicles`, { params });
  }

  getVehicleById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicles/${id}`);
  }

  createVehicle(vehicle: any, images: File[]): Observable<any> {
    const formData = new FormData();
    for (let key in vehicle) {
      formData.append(key, vehicle[key]);
    }
    images.forEach(image => formData.append('imagesInput', image));
    return this.http.post(`${this.apiUrl}/vehicles`, formData);
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

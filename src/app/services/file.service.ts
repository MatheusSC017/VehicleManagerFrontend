import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(vehicleId: number, images: File[]): Observable<void> {
    const formData = new FormData();
    formData.append('vehicleId', vehicleId.toString());
    for (let i = 0; i < images.length; i++) {
      formData.append('imagesInput', images[i]);
    }

    return this.http.post<void>(`${this.apiUrl}/files`, formData);
  }

  update(vehicleId: number, images: File[], selectedImages: number[]): Observable<void> {
    const formData = new FormData();
    formData.append('vehicleId', vehicleId.toString());
    images.forEach(image => formData.append('imagesInput', image));
    
    selectedImages.forEach(imageId => formData.append('selectedImages', imageId.toString()));

    return this.http.put<void>(`${this.apiUrl}/files/${vehicleId}`, formData);
  }

}


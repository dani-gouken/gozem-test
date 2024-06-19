import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getPackages() {
    return this.http.get<Package[]>(`${this.baseUrl}/api/package`);
  }

  getDeliveries() {
    return this.http.get<Delivery[]>(`${this.baseUrl}/api/delivery`);
  }

  savePackage(data: Partial<Package>) {
    const packageId = uuidv4();
    return this.http.post<Package>(`${this.baseUrl}/api/package/${packageId}`, data);
  }

  saveDelivery(data: Partial<Delivery>) {
    const deliveryId = uuidv4();
    return this.http.post<Delivery>(
      `${this.baseUrl}/api/delivery/${deliveryId}`,
      data
    );
  }

  updateDelivery(deliveryId: string, data: Partial<Delivery>) {
    return this.http.put<Delivery>(
      `${this.baseUrl}/api/delivery/${deliveryId}`,
      data
    );
  }

  findDelivery(deliveryId: string) {
    return this.http.get<Delivery>(
      `${this.baseUrl}/api/delivery/${deliveryId}`
    );
  }

  findPackage(packegId: string) {
    return this.http.get<Package>(
      `${this.baseUrl}/api/package/${packegId}`
    );
  }
}

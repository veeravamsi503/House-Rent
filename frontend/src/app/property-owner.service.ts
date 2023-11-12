import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropertyOwner } from './property-owner.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyOwnerService {
  private baseUrl = 'http://localhost:3000/property-owners'; // Update the URL based on your backend API

  constructor(private http: HttpClient) { }
  // Add the getOwnerContactEmail method to retrieve owner's contact email
  getOwnerContactEmail(ownerId: string): Observable<any> {
    return this.http.get<any>(`/api/property-owners/${ownerId}/contact-email`);
  }

  requestContactDetails(ownerId: string, tenantId: string): Observable<void> {
    const url = `${this.baseUrl}/${ownerId}/contact-request`;
    const body = { tenantId };

    return this.http.post<void>(url, body);
  }

  approveContactRequest(ownerId: string): Observable<void> {
    const url = `${this.baseUrl}/${ownerId}/approve-contact-request`;

    return this.http.put<void>(url, null);
  }

  getPropertyOwners(): Observable<PropertyOwner[]> {
    return this.http.get<PropertyOwner[]>(this.baseUrl);
  }

  getPropertyOwner(id: string): Observable<PropertyOwner> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<PropertyOwner>(url);
  }

  createPropertyOwner(propertyOwner: PropertyOwner): Observable<PropertyOwner> {
    return this.http.post<PropertyOwner>(this.baseUrl, propertyOwner);
  }

  updatePropertyOwner(id: string, propertyOwner: PropertyOwner): Observable<PropertyOwner> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<PropertyOwner>(url, propertyOwner);
  }
}

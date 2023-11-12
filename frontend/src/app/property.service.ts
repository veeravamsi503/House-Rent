import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Property } from './property.model';
import { PropertyOwner } from './property-owner.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:3000/properties'; // Update with your API endpoint
  private token: string | null;
  private _isLoggedIn = false;

  constructor(private http: HttpClient,private authService : AuthService) {
    this.token = localStorage.getItem('token');
    this._isLoggedIn = this.token !== null;
   }
  getToken(): string | null {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
    this._isLoggedIn = true;
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  requestContactDetails(ownerId: string, tenantId: string): Observable<void> {
    const url = `${this.apiUrl}/property-owners/${ownerId}/contact-request`;
    const body = { tenantId };

    return this.http.post<void>(url, body);
  }


  getOwnerContactEmail(id: string): Observable<PropertyOwner> {
    const url = `http://localhost:3000/property-owners/${id}`; // Update the URL to match your API endpoint
    return this.http.get<PropertyOwner>(url);
  }


  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl);
  }

  getPropertyById(id: string): Observable<Property> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Property>(url);
  }

  // createProperty(property: Property): Observable<Property> {
  //   return this.http.post<Property>(this.apiUrl, property);
  // }

  createProperty(property: Property): Observable<{ token: string }> {
    const url = `${this.apiUrl}`;
    const headers = this.authService.getAuthHeaders();
    return this.http.post<{ token: string }>(url, property, { headers })
    .pipe(tap(res => {
      this.setToken(res.token);
      console.log(this.token);
    }));;;
  }



  updateProperty(id: string, property: Property): Observable<Property> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Property>(url, property);
  }

  deleteProperty(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

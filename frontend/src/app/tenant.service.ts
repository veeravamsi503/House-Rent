import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tenant } from './tenant.model';


@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private apiUrl = 'http://localhost:3000/tenants';

  constructor(private http: HttpClient) { }

  getTenants(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>(this.apiUrl);
  }

  getTenant(id: string): Observable<Tenant> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Tenant>(url);
  }

  addTenant(tenant: Tenant): Observable<Tenant> {
    return this.http.post<Tenant>(this.apiUrl, tenant);
  }

  updateTenant(id: string, tenant: Tenant): Observable<Tenant> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Tenant>(url, tenant);
  }

  deleteTenant(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

import { Component, OnInit } from '@angular/core';
import { PropertyOwnerService } from '../property-owner.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface PropertyOwner {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface Property {
  _id: string;
  owner: PropertyOwner;
  rent: number;
  area: string;
  place: string;
  amenities: string[];
  status: 'Available' | 'Occupied';
}

@Component({
  selector: 'app-property-owners',
  templateUrl: './property-owners.component.html',
  styleUrls: ['./property-owners.component.css']
})
export class PropertyOwnersComponent implements OnInit {
  propertyOwners: PropertyOwner[] = [];
  properties: Property[] = [];

  constructor(private http: HttpClient, private propertyOwnerService: PropertyOwnerService) {}

  ngOnInit() {
    this.getPropertyOwners();
  }

  getPropertyOwners() {
    this.propertyOwnerService.getPropertyOwners().subscribe(
      (data: any) => {
        this.propertyOwners = data;
        this.getProperties();
      },
      error => {
        console.log('An error occurred while fetching property owners:', error);
      }
    );
  }

  getProperties(): void {
    const token = localStorage.getItem('token');

    if (token && this.propertyOwners.length > 0) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Concatenate all property owner IDs into a single array
      const ownerIds = this.propertyOwners.map(owner => owner._id);

      this.http
        .get(`http://localhost:3000/properties?ownerIds=${ownerIds.join(',')}`, { headers })
        .subscribe(
          (response: any) => {
            this.properties = response;
            console.log(this.properties);
          },
          (error: any) => {
            console.error('Error fetching properties:', error);
          }
        );
    }
  }

  updateProperty(property: any): void {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http
        .put(`http://localhost:3000/properties/${property._id}`, property, { headers })
        .subscribe(
          (response: any) => {
            console.log('Property updated successfully:', response);
            // Refresh properties after successful update
            this.getProperties();
          },
          (error: any) => {
            console.error('Error updating property:', error);
          }
        );
    }
  }

  deleteProperty(property: Property): void {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http
        .delete(`http://localhost:3000/properties/${property._id}`, { headers })
        .subscribe(
          (response: any) => {
            console.log('Property deleted successfully:', response);
            // Refresh properties after successful deletion
            this.getProperties();
          },
          (error: any) => {
            console.error('Error deleting property:', error);
          }
        );
    }
  }

  changeStatus(property: Property): void {
    property.status = property.status === 'Available' ? 'Occupied' : 'Available';

    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http
        .put(`http://localhost:3000/properties/${property._id}`, property, { headers })
        .subscribe(
          (response: any) => {
            alert(`Property status changed successfully..!!`)
            console.log('Property status changed successfully:', response);
            // Refresh properties after successful status change
            this.getProperties();
          },
          (error: any) => {
            console.error('Error changing property status:', error);
          }
        );
    }
  }
}

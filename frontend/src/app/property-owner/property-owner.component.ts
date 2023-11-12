import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PropertyOwner } from '../property-owner.model';
import { Property } from '../property.model';
import { PropertyOwnerService } from '../property-owner.service';

@Component({
  selector: 'app-property-owner',
  templateUrl: './property-owner.component.html',
  styleUrls: ['./property-owner.component.css']
})
export class PropertyOwnerComponent implements OnInit {
  propertyOwner: PropertyOwner[];
  properties: Property[];

  constructor(private http: HttpClient,private propertyOwnerService: PropertyOwnerService) { }

  ngOnInit(): void {
    // Fetch property owner data
    this.getPropertyOwners();

    // Fetch properties for the logged-in property owner
    // this.getProperties();
  }



  getPropertyOwners() {
    this.propertyOwnerService.getPropertyOwners().subscribe(
      (data: PropertyOwner[]) => {
        this.propertyOwner = data;
        console.log(this.propertyOwner)
      },
      error => {
        console.log('An error occurred while fetching property owners:', error);
      }
    );
  }


  getProperties(): void {
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    if (token && this.propertyOwner) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.propertyOwner.forEach((owner: any) => {
        this.http
          .get(`http://localhost:3000/property-owners/${owner._id}/properties`, { headers })
          .subscribe(
            (response: any) => {
              this.properties = this.properties.concat(response);
              console.log(this.properties)
            },
            (error: any) => {
              console.error('Error fetching properties:', error);
            }
          );
      });
    }
  }
  // updateProperty(property: any): void {
  //   const token = localStorage.getItem('token'); // Retrieve token from local storage

  //   if (token) {
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //     this.http.put(`http://localhost:3000/property-owners/${this.propertyOwner.id}/properties/${property._id}`, property, { headers })
  //       .subscribe(
  //         (response: any) => {
  //           console.log('Property updated successfully:', response);
  //           // Refresh properties after successful update
  //           this.getProperties();
  //         },
  //         (error: any) => {
  //           console.error('Error updating property:', error);
  //         }
  //       );
  //   }
  // }

  // deleteProperty(property: any): void {
  //   const token = localStorage.getItem('token'); // Retrieve token from local storage

  //   if (token) {
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //     this.http.delete(`http://localhost:3000/property-owners/${this.propertyOwner.id}/properties/${property._id}`, { headers })
  //       .subscribe(
  //         (response: any) => {
  //           console.log('Property deleted successfully:', response);
  //           // Refresh properties after successful deletion
  //           this.getProperties();
  //         },
  //         (error: any) => {
  //           console.error('Error deleting property:', error);
  //         }
  //       );
  //   }
  // }
}

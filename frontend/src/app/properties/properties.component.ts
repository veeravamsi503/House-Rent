import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property.service';
import { PropertyOwner } from '../property-owner.model';
import { PropertyOwnerService } from '../property-owner.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties: any[] = [];
  filteredProperties: any[] = [];
  searchLocation: string = '';
  usertype: string | any;
  private _isLoggedIn: boolean = false;
  show:boolean=false;

  constructor(
    private authService: AuthService,
    private propertyService: PropertyService,
    private propertyOwnerService: PropertyOwnerService
  ) {
    if (this.authService.isLoggedIn()) {
      this._isLoggedIn = true;
    }
  }

  ngOnInit(): void {
    this.usertype = localStorage.getItem('usertype');
    this.getPropertyList();
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  getPropertyList() {
    this.propertyService.getProperties().subscribe(
      (properties: any[]) => {
        this.properties = properties.map((property) => ({
          ...property,
          showContactEmail: false,
          contactEmail: '', // Add a property to store the owner's contact email
          contactRequestApproved: false, // Add a property to track the contact request approval status

        }));
        this.filteredProperties = [...this.properties];
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  filterProperties() {
    if (!this.searchLocation) {
      this.filteredProperties = [...this.properties];
    } else {
      this.filteredProperties = this.properties.filter(
        (property) =>
          property.place.toLowerCase().includes(this.searchLocation.toLowerCase()) ||
          property.area.toLowerCase().includes(this.searchLocation.toLowerCase())
      );
    }
  }

  toggleContactEmail(property: any): void {
    property.showContactEmail = !property.showContactEmail;

    if (property.showContactEmail && !property.contactEmail) {
      this.getOwnerContactEmail(property.owner);
    }
  }

  getOwnerContactEmail(owner: string): void {
    if (!owner) {
      console.error('Owner is undefined');
      return;
    }

    this.propertyOwnerService.getOwnerContactEmail(owner).subscribe(
      (response: PropertyOwner) => {
        const contactEmail = response.email;

        // Find the property and assign the contact email
        const property = this.properties.find((prop) => prop.owner === owner);
        if (property) {
          property.contactEmail = contactEmail;
        }

        console.log('Contact Email:', contactEmail);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  requestContactDetails(property: any): void {
    const tenantId = property.tenantId; // Replace with the ID of the authenticated tenant
    const ownerId = property.owner;

    this.propertyOwnerService.requestContactDetails(ownerId, tenantId).subscribe(
      () => {
        console.log('Contact request sent');
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  approveContactRequest(property: any): void {
    const ownerId = property.owner; // Replace with the ID of the authenticated property owner

    this.propertyOwnerService.approveContactRequest(ownerId).subscribe(
      () => {
        console.log('Contact request approved');
        property.contactEmail = 'propertyowner@gmail.com'; // Replace with the property owner's email
        property.contactRequestApproved = true; // Set the contact request approval status to true
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}

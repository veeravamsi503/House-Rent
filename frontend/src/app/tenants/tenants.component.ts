import { Component, OnInit } from '@angular/core';
import { Tenant } from '../tenant.model';
import { TenantService } from '../tenant.service';



@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit {
  tenants: Tenant[] = [];

  constructor(private tenantService: TenantService) { }

  ngOnInit() {
    this.loadTenants();
  }

  loadTenants() {
    this.tenantService.getTenants().subscribe(
      (tenants: Tenant[]) => {
        this.tenants = tenants;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}

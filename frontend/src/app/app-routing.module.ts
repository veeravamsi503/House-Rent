import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertyOwnersComponent } from './property-owners/property-owners.component';
import { PropertiesComponent } from './properties/properties.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PropertyAddComponent } from './property-add/property-add.component';
import { PropertyOwnerComponent } from './property-owner/property-owner.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'add-property', component: PropertyAddComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'property-owner', component: PropertyOwnerComponent },
  { path: 'property-owners', component: PropertyOwnersComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: 'tenants', component: TenantsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

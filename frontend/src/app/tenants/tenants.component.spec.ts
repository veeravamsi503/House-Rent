import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsComponent } from './tenants.component';

describe('TenantsComponent', () => {
  let component: TenantsComponent;
  let fixture: ComponentFixture<TenantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenantsComponent]
    });
    fixture = TestBed.createComponent(TenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyOwnerComponent } from './property-owner.component';

describe('PropertyOwnerComponent', () => {
  let component: PropertyOwnerComponent;
  let fixture: ComponentFixture<PropertyOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyOwnerComponent]
    });
    fixture = TestBed.createComponent(PropertyOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

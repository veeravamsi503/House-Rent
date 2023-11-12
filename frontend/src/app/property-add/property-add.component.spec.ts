import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAddComponent } from './property-add.component';

describe('PropertyAddComponent', () => {
  let component: PropertyAddComponent;
  let fixture: ComponentFixture<PropertyAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyAddComponent]
    });
    fixture = TestBed.createComponent(PropertyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

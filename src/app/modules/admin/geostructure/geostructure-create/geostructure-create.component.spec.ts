import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeostructureCreateComponent } from './geostructure-create.component';

describe('GeostructureCreateComponent', () => {
  let component: GeostructureCreateComponent;
  let fixture: ComponentFixture<GeostructureCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeostructureCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeostructureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

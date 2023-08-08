import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeostructureDetailComponent } from './geostructure-detail.component';

describe('GeostructureDetailComponent', () => {
  let component: GeostructureDetailComponent;
  let fixture: ComponentFixture<GeostructureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeostructureDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeostructureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

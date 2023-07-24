import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeostructureUpdateComponent } from './geostructure-update.component';

describe('GeostructureUpdateComponent', () => {
  let component: GeostructureUpdateComponent;
  let fixture: ComponentFixture<GeostructureUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeostructureUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeostructureUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

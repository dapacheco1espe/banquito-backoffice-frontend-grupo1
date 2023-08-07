import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeostructureComponent } from './geostructure.component';

describe('GeostructureComponent', () => {
  let component: GeostructureComponent;
  let fixture: ComponentFixture<GeostructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeostructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeostructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

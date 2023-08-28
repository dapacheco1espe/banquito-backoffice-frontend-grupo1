import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNaturalesComponent } from './gestion-naturales.component';

describe('GestionNaturalesComponent', () => {
  let component: GestionNaturalesComponent;
  let fixture: ComponentFixture<GestionNaturalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionNaturalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionNaturalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

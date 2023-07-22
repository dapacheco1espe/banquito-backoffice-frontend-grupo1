import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionJuridicosComponent } from './gestion-juridicos.component';

describe('GestionJuridicosComponent', () => {
  let component: GestionJuridicosComponent;
  let fixture: ComponentFixture<GestionJuridicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionJuridicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionJuridicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

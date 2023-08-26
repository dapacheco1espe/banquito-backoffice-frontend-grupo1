import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCuentasComponent } from './gestion-cuentas.component';

describe('GestionCuentasComponent', () => {
  let component: GestionCuentasComponent;
  let fixture: ComponentFixture<GestionCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCuentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

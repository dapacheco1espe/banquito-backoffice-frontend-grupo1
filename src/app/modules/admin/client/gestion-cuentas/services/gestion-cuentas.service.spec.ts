import { TestBed } from '@angular/core/testing';

import { GestionCuentasService } from './gestion-cuentas.service';

describe('GestionCuentasService', () => {
  let service: GestionCuentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionCuentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

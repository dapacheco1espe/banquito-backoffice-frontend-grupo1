import { TestBed } from '@angular/core/testing';

import { GeostructureService } from './geostructure.service';

describe('GeostructureService', () => {
  let service: GeostructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeostructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

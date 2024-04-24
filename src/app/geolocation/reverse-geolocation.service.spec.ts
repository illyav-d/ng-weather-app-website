import { TestBed } from '@angular/core/testing';

import { ReverseGeolocationService } from './reverse-geolocation.service';

describe('ReverseGeolocationService', () => {
  let service: ReverseGeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReverseGeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

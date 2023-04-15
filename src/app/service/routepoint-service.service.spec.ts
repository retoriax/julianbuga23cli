import { TestBed } from '@angular/core/testing';

import { RoutepointServiceService } from './routepoint-service.service';

describe('RoutepointServiceService', () => {
  let service: RoutepointServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutepointServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

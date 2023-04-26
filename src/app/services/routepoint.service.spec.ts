import { TestBed } from '@angular/core/testing';

import { RoutepointService } from './routepoint.service';

describe('RoutepointService', () => {
  let service: RoutepointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutepointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

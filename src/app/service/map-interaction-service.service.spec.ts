import { TestBed } from '@angular/core/testing';

import { MapInteractionServiceService } from './map-interaction-service.service';

describe('MapInteractionServiceService', () => {
  let service: MapInteractionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapInteractionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

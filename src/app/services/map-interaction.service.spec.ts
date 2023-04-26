import { TestBed } from '@angular/core/testing';

import { MapInteractionService } from './map-interaction.service';

describe('MapInteractionServiceService', () => {
  let service: MapInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

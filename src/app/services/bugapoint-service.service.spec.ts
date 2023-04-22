import { TestBed } from '@angular/core/testing';

import { BugapointServiceService } from './bugapoint-service.service';

describe('BugapointServiceService', () => {
  let service: BugapointServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BugapointServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

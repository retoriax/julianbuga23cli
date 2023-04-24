import { TestBed } from '@angular/core/testing';

import { BugapointService } from './bugapoint.service';

describe('BugapointService', () => {
  let service: BugapointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BugapointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

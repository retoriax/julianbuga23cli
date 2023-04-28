import { TestBed } from '@angular/core/testing';

import { AdminBugapointService } from './admin-bugapoint.service';

describe('AdminBugapointService', () => {
  let service: AdminBugapointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBugapointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

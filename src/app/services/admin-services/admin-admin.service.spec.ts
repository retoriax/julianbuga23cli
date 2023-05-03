import { TestBed } from '@angular/core/testing';

import { AdminAdminService } from './admin-admin.service';

describe('AdminAdminService', () => {
  let service: AdminAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

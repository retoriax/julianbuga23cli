import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelNewpointpanelComponent } from './adminpanel-newpointpanel.component';

describe('AdminpanelNewpointpanelComponent', () => {
  let component: AdminpanelNewpointpanelComponent;
  let fixture: ComponentFixture<AdminpanelNewpointpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpanelNewpointpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminpanelNewpointpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

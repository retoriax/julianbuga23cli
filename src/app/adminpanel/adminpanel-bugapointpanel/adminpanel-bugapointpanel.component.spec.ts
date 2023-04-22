import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelBugapointpanelComponent } from './adminpanel-bugapointpanel.component';

describe('AdminpanelBugapointpanelComponent', () => {
  let component: AdminpanelBugapointpanelComponent;
  let fixture: ComponentFixture<AdminpanelBugapointpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpanelBugapointpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminpanelBugapointpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

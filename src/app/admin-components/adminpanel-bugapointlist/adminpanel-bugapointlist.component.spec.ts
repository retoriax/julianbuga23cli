import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelBugapointlistComponent } from './adminpanel-bugapointlist.component';

describe('AdminpanelBugapointlistComponent', () => {
  let component: AdminpanelBugapointlistComponent;
  let fixture: ComponentFixture<AdminpanelBugapointlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpanelBugapointlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminpanelBugapointlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

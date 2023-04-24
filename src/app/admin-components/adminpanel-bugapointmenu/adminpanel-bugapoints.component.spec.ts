import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelBugapointsComponent } from './adminpanel-bugapoints.component';

describe('AdminpanelBugapointsComponent', () => {
  let component: AdminpanelBugapointsComponent;
  let fixture: ComponentFixture<AdminpanelBugapointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpanelBugapointsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminpanelBugapointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

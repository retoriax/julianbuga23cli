import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelMenuComponent } from './adminpanel-menu.component';

describe('AdminpanelMenuComponent', () => {
  let component: AdminpanelMenuComponent;
  let fixture: ComponentFixture<AdminpanelMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpanelMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminpanelMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

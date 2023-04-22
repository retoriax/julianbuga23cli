import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelSubmenubarComponent } from './adminpanel-submenubar.component';

describe('AdminpanelSubmenubarComponent', () => {
  let component: AdminpanelSubmenubarComponent;
  let fixture: ComponentFixture<AdminpanelSubmenubarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpanelSubmenubarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminpanelSubmenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

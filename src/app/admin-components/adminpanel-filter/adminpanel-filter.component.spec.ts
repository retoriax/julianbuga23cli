import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelFilterComponent } from './adminpanel-filter.component';

describe('AdminpanelFilterComponent', () => {
  let component: AdminpanelFilterComponent;
  let fixture: ComponentFixture<AdminpanelFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpanelFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminpanelFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

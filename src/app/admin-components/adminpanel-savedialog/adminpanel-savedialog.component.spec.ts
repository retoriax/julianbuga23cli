import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelSavedialogComponent } from './adminpanel-savedialog.component';

describe('AdminpanelSavedialogComponent', () => {
  let component: AdminpanelSavedialogComponent;
  let fixture: ComponentFixture<AdminpanelSavedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpanelSavedialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminpanelSavedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

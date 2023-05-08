import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugapointmenuComponent } from './bugapointmenu.component';

describe('AdminpanelBugapointsComponent', () => {
  let component: BugapointmenuComponent;
  let fixture: ComponentFixture<BugapointmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugapointmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugapointmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugapointlistComponent } from './bugapointlist.component';

describe('AdminpanelBugapointlistComponent', () => {
  let component: BugapointlistComponent;
  let fixture: ComponentFixture<BugapointlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugapointlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugapointlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

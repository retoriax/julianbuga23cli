import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugapointpanelComponent } from './bugapointpanel.component';

describe('AdminpanelBugapointpanelComponent', () => {
  let component: BugapointpanelComponent;
  let fixture: ComponentFixture<BugapointpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugapointpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugapointpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

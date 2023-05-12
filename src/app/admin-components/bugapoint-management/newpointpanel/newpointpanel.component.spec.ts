import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpointpanelComponent } from './newpointpanel.component';

describe('AdminpanelNewpointpanelComponent', () => {
  let component: NewpointpanelComponent;
  let fixture: ComponentFixture<NewpointpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewpointpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewpointpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

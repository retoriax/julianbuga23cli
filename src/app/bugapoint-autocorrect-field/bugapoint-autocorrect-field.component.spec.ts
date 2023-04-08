import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugapointAutocorrectFieldComponent } from './bugapoint-autocorrect-field.component';

describe('BugapointAutocorrectFieldComponent', () => {
  let component: BugapointAutocorrectFieldComponent;
  let fixture: ComponentFixture<BugapointAutocorrectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugapointAutocorrectFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugapointAutocorrectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

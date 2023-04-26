import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugapointAutocompleteFieldComponent } from './bugapoint-autocomplete-field.component';

describe('BugapointAutocorrectFieldComponent', () => {
  let component: BugapointAutocompleteFieldComponent;
  let fixture: ComponentFixture<BugapointAutocompleteFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugapointAutocompleteFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugapointAutocompleteFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

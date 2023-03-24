import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugapointFormComponent } from './bugapoint-form.component';

describe('BugapointFormComponent', () => {
  let component: BugapointFormComponent;
  let fixture: ComponentFixture<BugapointFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugapointFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugapointFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

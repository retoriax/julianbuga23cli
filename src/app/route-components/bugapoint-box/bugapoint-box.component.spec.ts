import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugapointBoxComponent } from './bugapoint-box.component';

describe('BugapointBoxComponent', () => {
  let component: BugapointBoxComponent;
  let fixture: ComponentFixture<BugapointBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugapointBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugapointBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

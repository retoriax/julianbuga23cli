import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugapointListComponent } from './bugapoint-list.component';

describe('BugapointListComponent', () => {
  let component: BugapointListComponent;
  let fixture: ComponentFixture<BugapointListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugapointListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugapointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

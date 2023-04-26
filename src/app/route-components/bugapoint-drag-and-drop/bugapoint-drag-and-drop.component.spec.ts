import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugapointDragAndDropComponent } from './bugapoint-drag-and-drop.component';

describe('BugapointDragAndDropComponent', () => {
  let component: BugapointDragAndDropComponent;
  let fixture: ComponentFixture<BugapointDragAndDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugapointDragAndDropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugapointDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMapFilterComponent } from './new-map-filter.component';

describe('NewMapFilterComponent', () => {
  let component: NewMapFilterComponent;
  let fixture: ComponentFixture<NewMapFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMapFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMapFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

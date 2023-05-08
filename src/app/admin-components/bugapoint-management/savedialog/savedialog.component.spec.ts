import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedialogComponent } from './savedialog.component';

describe('AdminpanelSavedialogComponent', () => {
  let component: SavedialogComponent;
  let fixture: ComponentFixture<SavedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

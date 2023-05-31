import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsReportMenuComponent } from './visitors-report-menu.component';

describe('VisitorsReportMenuComponent', () => {
  let component: VisitorsReportMenuComponent;
  let fixture: ComponentFixture<VisitorsReportMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorsReportMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorsReportMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

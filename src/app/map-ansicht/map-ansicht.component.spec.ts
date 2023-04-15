import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAnsichtComponent } from './map-ansicht.component';

describe('MapAnsichtComponent', () => {
  let component: MapAnsichtComponent;
  let fixture: ComponentFixture<MapAnsichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapAnsichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapAnsichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

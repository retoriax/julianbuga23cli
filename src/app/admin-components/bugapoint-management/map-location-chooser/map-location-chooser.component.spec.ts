import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLocationChooserComponent } from './map-location-chooser.component';

describe('MapLocationChooserComponent', () => {
  let component: MapLocationChooserComponent;
  let fixture: ComponentFixture<MapLocationChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapLocationChooserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapLocationChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

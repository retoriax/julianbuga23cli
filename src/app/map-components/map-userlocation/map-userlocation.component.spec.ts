import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapUserlocationComponent } from './map-userlocation.component';

describe('MapUserlocationComponent', () => {
  let component: MapUserlocationComponent;
  let fixture: ComponentFixture<MapUserlocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapUserlocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapUserlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

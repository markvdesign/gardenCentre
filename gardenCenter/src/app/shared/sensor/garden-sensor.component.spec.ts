import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenSensorComponent } from './garden-sensor.component';

describe('SensorComponent', () => {
  let component: GardenSensorComponent;
  let fixture: ComponentFixture<GardenSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardenSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

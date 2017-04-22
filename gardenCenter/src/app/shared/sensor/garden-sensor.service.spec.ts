import { TestBed, inject } from '@angular/core/testing';

import { GardenSensorService } from './garden-sensor.service';

describe('GardenSensorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GardenSensorService]
    });
  });

  it('should ...', inject([GardenSensorService], (service: GardenSensorService) => {
    expect(service).toBeTruthy();
  }));
});

import { Component, OnInit, Input } from '@angular/core';
import { five, Sensor } from 'johnny-five';
import { GardenSensorService } from './garden-sensor.service';
import { SensorReading } from './sensor-reading';

@Component({
  selector: 'gc-sensor',
  templateUrl: './garden-sensor.component.html',
  styleUrls: ['./garden-sensor.component.scss']
})
export class GardenSensorComponent implements OnInit {
  @Input() sensorId: number;
  @Input() gardenName: string;
  iconArrow: string = 'icon-arrow-up'; // to be used to show if the reading has gone up of down.

  sensorReading: SensorReading;
  lastReading: number;

  constructor(private sensorService: GardenSensorService) { }

  ngOnInit() {
    this.sensorService.getSoilReadingById(this.sensorId)
                      .subscribe(sensorReading => this.sensorReading = sensorReading);
  }

  getSensorReading() {

  };

}

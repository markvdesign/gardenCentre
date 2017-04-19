import { Component, OnInit, Input } from '@angular/core';
import { five, Sensor } from 'johnny-five';

@Component({
  selector: 'gc-sensor',
  templateUrl: './garden-sensor.component.html',
  styleUrls: ['./garden-sensor.component.scss']
})
export class GardenSensorComponent implements OnInit {
  @Input() sensorPin: string = 'A0';
  @Input() gardenNumber: number;
  @Input() gardenName: string;
  iconArrow: string = 'icon-arrow-up'; // to be used to show if the reading has gone up of down.

  sensorReading: number = ( (100 * Math.random()) + Math.random());
  lastReading: number = 54;

  constructor() { }

  ngOnInit() {
    // const sensor = new five.Sensor({
    //     pin: this.sensorPin,
    //     freq: 3600000,
    //     threshold: 5
    // });

    // sensor.on('data', () => {
    //   this.sensorReading = sensor.scaleTo(0, 100);
    // });
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { five, Sensor } from 'johnny-five';

@Component({
  selector: 'gc-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {
  @Input() sensorPin: string = 'A0';

  sensorReading: number;

  constructor() { }

  ngOnInit() {
    const sensor = new five.Sensor({
        pin: this.sensorPin,
        freq: 3600000,
        threshold: 5
    });

    sensor.on('data', () => {
      this.sensorReading = sensor.scaleTo(0, 100);
    });
  }

}

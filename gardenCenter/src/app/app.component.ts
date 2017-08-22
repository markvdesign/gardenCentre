import { Component, OnInit } from '@angular/core';
import { five, board } from 'johnny-five';
import { GardenSensorComponent } from './shared/sensor/garden-sensor.component';

@Component({
  selector: 'gc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {}
  ngOnInit() {
  
  }
}

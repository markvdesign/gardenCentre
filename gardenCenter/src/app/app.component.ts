import { Component, OnInit } from '@angular/core';
import { five, board } from 'johnny-five';
import { SensorComponent } from './shared/sensor/sensor.component';

@Component({
  selector: 'gc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Welcome to Garden Centre!';
  sensor = new SensorComponent();

  constructor() {}

  ngOnInit() {
    const board = new five.Board();
    board.on('ready', () => {
      this.sensor.ngOnInit();
    });
  }
}

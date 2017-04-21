import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GardenSensorComponent } from './sensor/garden-sensor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GardenSensorComponent],
  exports: [
    GardenSensorComponent
  ]
})
export class SharedModule { }

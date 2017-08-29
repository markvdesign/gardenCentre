import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GardenSensorComponent } from './sensor/garden-sensor.component';
import { GardenSensorService } from './sensor/garden-sensor.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanLoadGuardComponent } from './src/app/shared/can-load-guard/can-load-guard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GardenSensorComponent, PageNotFoundComponent, CanLoadGuardComponent],
  exports: [
    GardenSensorComponent
  ],
  providers: [
    GardenSensorService
  ]
})
export class SharedModule { }

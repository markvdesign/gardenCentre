import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { environment } from '../../../environments/environment';
import { SensorReading } from './sensor-reading';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class GardenSensorService {
  // private token = () => {
  //   window.localStorage.getItem('x-gc-token');
  // };
  private readonly headers = new Headers({
    'content-type': 'application/json'
    // 'x-gc-token': this.token
  });
  private readonly options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) { }

  getSoilReadingById(id: number): Observable<SensorReading>{
    return this.http.get(`${environment.base_api}/lastsoilreading/${id}`, this.options)
      .map(data => data.json())
      .catch(this.handleErrors);
  }

  private handleErrors(error) {
    console.log(`Error from garden-sensor: ${error}`)
    return Observable.throw(error);
  }

}

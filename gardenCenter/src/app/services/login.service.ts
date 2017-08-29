import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import '../barrels/rxjsBarrel';
import { User } from '../models/user.interface';
import { LoginResponse } from '../models/login-response.interface';

@Injectable()
export class LoginService {
  private readonly headers = new Headers({'content-type': 'application/json'});
  private readonly options = new RequestOptions({headers: this.headers});
  constructor(private http: Http) { }

  // TODO: Sign in service needs completing this is a temp sign in service
  login(user: User): Observable<LoginResponse> {
    return this.http.post(`${environment.base_api}/login`, user, this.options)
                    .map(data => data)
                    .catch(this.handleErrors);
  }

  private handleErrors(error) {
    console.log(`Error from login service: ${error}`)
    return Observable.throw(error);
  }

}

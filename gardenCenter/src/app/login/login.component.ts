import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { User } from '../models/user.interface';
import { LoginResponse } from '../models/login-response.interface';

@Component({
  selector: 'gc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginResponse: LoginResponse;
  formErrors: boolean = false;
  errorMessage: string = '';

  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit(userName: string, password: string) {
    let formUser: User;
    formUser = this.loginForm.value;

    this.loginService.login(formUser)
      .subscribe(loginResponse => {

        // TODO: Handle expired token

        this.loginResponse = loginResponse;
        if (this.loginResponse !== undefined) {
          if (!this.loginResponse.success) {
            console.log(`Log in failed ${this.loginResponse.message}`);
            this.formErrors = true;
            console.info(`login success is: ${this.loginResponse.success}`);
            this.errorMessage = this.loginResponse.message;
            return;
          } else if (this.loginResponse.gc_token === null || this.loginResponse.gc_token === '') {
            this.formErrors = true;
            this.errorMessage = this.loginResponse.message;
            console.log(this.loginResponse.message);
            return;
          } else {
            localStorage.setItem('x-gc-token', this.loginResponse.gc_token);
            this.formErrors = false;
          }
        } else {
          console.log(`Error with login ${this.loginResponse.message}`);
          this.formErrors = true;
          this.errorMessage = this.loginResponse.message;
        }
      });
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password:['', Validators.required]
    });
  }

}

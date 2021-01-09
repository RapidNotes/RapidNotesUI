import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isActive= true;
  public invalidData=false;
  public loginForm = new FormGroup({
    email: new FormControl(null,
        Validators.required
      ),
    password: new FormControl(null,
      Validators.required
      )
  });

  constructor(private authService: AuthService, private router:  Router) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.invalidData=true
    } else {
      const loginData = {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      };
      this.authService.login(loginData.email, loginData.password);
      this.router.navigate(["/home"])
    }

  }

}

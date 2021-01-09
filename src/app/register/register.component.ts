import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public invalidData=false;
  public registerForm = new FormGroup({
    username: new FormControl(null,
      Validators.required
    ),
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

  register(): void {
    if (this.registerForm.invalid) {
      this.invalidData=true
    } else {
      const loginData = {
        email: this.registerForm.controls.email.value,
        password: this.registerForm.controls.password.value
      };
      this.authService.signup(loginData.email, loginData.password);
      this.router.navigate(["/login"])
    }
  }

}

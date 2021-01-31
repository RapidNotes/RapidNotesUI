import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../_models/user';

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
        username: this.registerForm.controls.username.value,
        email: this.registerForm.controls.email.value,
        password: this.registerForm.controls.password.value
      };
      this.authService.signup(loginData.email, loginData.password).then(value => {
        var data: User = {username: loginData.username, uid: value.user!.uid, email: loginData.email}
        this.authService.createOrUpdateUser(value.user!.uid, data)
        console.log('Success!', value);
        this.router.navigate(["/login"])
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

  constructor(private authService: AuthService, private router:  Router, private firestore: AngularFirestore) {
    console.log(authService.user);
   }

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
      this.authService.login(loginData.email, loginData.password).then((value => {
        var self = this
        this.firestore.collection('users').doc(value.user!.uid).ref.get().then(function(doc) {
          if (doc.exists) {
            self.authService.user = doc.data()
            localStorage.setItem('user', JSON.stringify(self.authService.user));
          }
        }).finally(() =>
          this.router.navigate(["/home"])
        )})).catch(err => {
                console.log('Something went wrong:',err.message);
              });
        
    }

  }

}

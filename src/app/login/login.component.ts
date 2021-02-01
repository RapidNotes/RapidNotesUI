import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import { User } from '../_models/user';

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
        this.firestore.collection('users').doc(value.user!.uid).ref.get().then(doc => {
          if (doc.exists) {
            this.authService.user = doc.data()
            localStorage.setItem('user', JSON.stringify(this.authService.user));
          }
        }).finally(() =>
          this.router.navigate(["/home"])
        )})).catch(err => {
                console.log('Something went wrong:',err.message);
              });   
    }
  }

  loginWithGoogle(): void {
      this.authService.loginWithGoogle().then(res => {
        this.firestore.collection('users').doc(res.user!.uid).ref.get().then(doc => {
          if (doc.exists) {
            this.authService.user = doc.data()
            localStorage.setItem('user', JSON.stringify(this.authService.user));
          }
          else {
            var data: User = {username: <string>res.user!.providerData[0]!.displayName, uid: res.user!.uid, email: <string>res.user!.providerData[0]!.email}
            this.authService.createOrUpdateUser(res.user!.uid, data)
            this.authService.user = data
            localStorage.setItem('user', JSON.stringify(this.authService.user));
          }
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.router.navigate(["/home"])
        })
        console.log(res.user)
      })
  }

}

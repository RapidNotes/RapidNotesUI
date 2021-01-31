import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isActive = true;

  constructor(public authService: AuthService, private router:  Router) {
    console.log(authService.authState)
   }

   signout() {
     this.authService.logout().then((value => {
      localStorage.removeItem('user');
      this.authService.user = null;
      this.router.navigate(["/login"]);
        })).catch(err => {
              console.log('Something went wrong:',err.message);
            });
   }

  ngOnInit(): void {
  }

}

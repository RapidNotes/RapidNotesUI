import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { SidenavService } from '../services/sidenav/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isActive = true;
  public toggleButton = false;

  constructor(public authService: AuthService, private router:  Router, private sidenavservice: SidenavService) {
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

   toggleSidenav() {
    this.sidenavservice.toggle()
   }

   isLoggedIn() {
     if (localStorage.getItem('user') === null) {
       return false
     }
     else {
       return true
     }
    
   }

  ngOnInit(): void {
  }

}

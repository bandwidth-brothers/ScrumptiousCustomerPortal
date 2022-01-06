import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedAuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    console.log("Logged Act" + this.authService.isLoggedIn())
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl("home")
    }
    return !this.authService.isLoggedIn();
  }

  canLoad(): boolean {
    console.log("Logged Load" + this.authService.isLoggedIn())
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl("home")
    }
    return !this.authService.isLoggedIn();
  }
}


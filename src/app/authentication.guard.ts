import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/auth/login")
    }
    return this.authService.isLoggedIn();
  }
}

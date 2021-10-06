import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  userId: string;
  token: string;
  expiresAt: number;
}

interface AuthData {
  userId: string;
  token: string;
  expiresAt: Date;
  username: string;
  tokenExpirationTimer: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userId?: string;
  public token?: string;
  public expiresAt?: Date;
  public username?: string;
  private tokenExpirationTimer?: any;

  readonly LOGIN_URL = environment.BASE_AUTH_URL + '/login';
  readonly CONFIRM_REGISTRATION_URL = environment.BASE_AUTH_URL + '/accounts/confirm';
  readonly DELETE_ACCOUNT_URL = environment.BASE_AUTH_URL + '/customers';

  readonly STORAGE_KEY = 'AUTH_DATA';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {

    return this.http
      .post<AuthResponse>(this.LOGIN_URL, {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          this.handleAuthenticationSuccess(res, username);
        })
      );
  }

  private handleAuthenticationSuccess(res: AuthResponse, username: string) {
    this.token = res.token;
    this.expiresAt = new Date(res.expiresAt);
    this.userId = !!this.token ? res.userId : undefined;
    this.username = !!this.token ? username : undefined;

    this.tokenExpirationTimer = this.setAutoLogout(
      this.expiresAt.getTime() - new Date().getTime()
    );


    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify({
        userId: this.userId,
        token: this.token,
        expiresAt: this.expiresAt,
        username: this.username,
      })
    );
  }

  autoLogin() {
    const authData: AuthData = JSON.parse(
      <string>localStorage.getItem(this.STORAGE_KEY)
    );

    if (!authData) {
      return;
    }


    this.userId = authData.userId;
    this.token = authData.token;
    this.expiresAt = new Date(authData.expiresAt);
    this.username = authData.username;

    this.tokenExpirationTimer = this.setAutoLogout(
      this.expiresAt.getTime() - new Date().getTime()
    );
  }

  logout() {
    this.userId = undefined;
    this.token = undefined;
    this.expiresAt = undefined;
    this.username = undefined;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private setAutoLogout(expirationDuration: number) {
    return setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  isLoggedIn() {
    return !!this.token;
  }

  confirmRegistration(confirmationTokenId: string) {

    const url = this.CONFIRM_REGISTRATION_URL + '/' + confirmationTokenId;
    return this.http.put(url, null);
  }

  deleteAccount(username: string, password: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { id: this.userId, username: username, password: password },
    };

    return this.http.delete(this.DELETE_ACCOUNT_URL, options);
  }

  confirmDeletion(confirmationToken: string) {
    const url = this.DELETE_ACCOUNT_URL + '/confirm/' + confirmationToken;
    return this.http.delete(url).pipe(
      tap((res) => {
        this.logout();
      })
    );
  }
}
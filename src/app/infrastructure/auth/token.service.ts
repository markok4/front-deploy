import { Injectable } from '@angular/core';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from '../../shared/constants';
import { AuthUser } from './model/user.model';

@Injectable({
  providedIn: 'root',
})
export class TokenStorage {
  constructor() {}

  saveAccessToken(token: string): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  saveRefreshToken(token: string): void {
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.setItem(REFRESH_TOKEN, token);
  }

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  clear() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(USER);
  }
  getUser(): AuthUser {
    const userString = localStorage.getItem(USER);
    return userString ? JSON.parse(userString) : null;
  }
  saveUser(user: AuthUser): void {
    localStorage.setItem(USER, JSON.stringify(user));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { User, UserResponse } from './models/user-model';
import { environment } from 'src/app/env/environment';
import { FormGroup } from '@angular/forms';
import { TokenStorage } from 'src/app/infrastructure/auth/token.service';
import { AuthenticationResponse } from 'src/app/infrastructure/auth/model/authentication-response.model';
import { AuthUser } from 'src/app/infrastructure/auth/model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Advertisement } from './models/advertisement-model';

interface UserResponseWithQRCodeUrl extends User {
  qrCodeUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiHost;
  user$ = new BehaviorSubject<AuthUser>({
    email: '',
    id: 0,
    role: '',
    permissions: [],
  });

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router
  ) {}

  verify(id: string) {
    return this.http
      .get<AuthenticationResponse>(environment.apiHost + '/users/verify/' + id)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
          this.tokenStorage.saveRefreshToken(
            authenticationResponse.refreshtoken
          );
          this.setUser();
        })
      );
  }

  login(credentials: FormGroup<any>): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/users/login`, credentials);
  }

  verifyOtpToken(
    otpToken: string,
    email: string
  ): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.apiUrl}/users/verify-otp-login`, {
        otpToken,
        email,
      })
      .pipe(
        tap((authenticationResponse) => {
          console.log(authenticationResponse);
          this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
          this.tokenStorage.saveRefreshToken(
            authenticationResponse.refreshtoken
          );
          this.setUser();
        })
      );
  }

  passwordlessLogin(credentials: FormGroup<any>): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/users/passwordless-login`,
      credentials
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createAdvertisement(
    advertisementData: Advertisement
  ): Observable<Advertisement> {
    const user = this.tokenStorage.getUser();
    const userId = user ? user.id : 1;

    advertisementData.userId = userId;
    advertisementData.userId = userId;
    const url = `${this.apiUrl}/advertisement`;
    return this.http.post<Advertisement>(url, advertisementData);
  }
  approveRegistrationRequest(id: number) {
    return this.http.post(
      `${this.apiUrl}/users/accept-registration-request/` + id,
      {}
    );
  }

  declineRegistrationRequest(id: number) {
    return this.http.post(
      `${this.apiUrl}/users/decline-registration-request/` + id,
      {}
    );
  }

  getRegistrationRequests(): Observable<any> {
    return this.http.get<User[]>(`${this.apiUrl}/users/pending-registrations`);
  }

  getUserById(userId: number): Observable<User> {
    const url = `${this.apiUrl}/users/user/${userId}`;
    return this.http.get<User>(url);
  }

  getClients(): Observable<UserResponse[]> {
    const url = `${this.apiUrl}/users/clients`;
    return this.http.get<UserResponse[]>(url);
  }

  getEmployees(): Observable<UserResponse[]> {
    const url = `${this.apiUrl}/users/employees`;
    return this.http.get<UserResponse[]>(url);
  }

  getEmployeesByName(): Observable<string[]> {
    const url = `${this.apiUrl}/users/employees`;
    return this.http
      .get<User[]>(url)
      .pipe(
        map((users: User[]) =>
          users.map((user) => `${user.name} ${user.surname}`)
        )
      );
  }

  registerClient(userData: User): Observable<UserResponseWithQRCodeUrl> {
    const url = `${this.apiUrl}/users/register/client`;
    return this.http.post<UserResponseWithQRCodeUrl>(url, userData);
  }

  registerAdmin(userData: User): Observable<UserResponseWithQRCodeUrl> {
    const url = `${this.apiUrl}/users/register/admin`;
    return this.http.post<UserResponseWithQRCodeUrl>(url, userData);
  }

  registerEmployee(userData: User): Observable<UserResponseWithQRCodeUrl> {
    const url = `${this.apiUrl}/users/register/employee`;
    return this.http.post<UserResponseWithQRCodeUrl>(url, userData);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.tokenStorage.getRefreshToken();
    const url = `${this.apiUrl}/users/refresh-token`;
    return this.http.post<any>(url, { refreshToken: refreshToken }).pipe(
      tap((response) => {
        this.tokenStorage.saveAccessToken(response.accessToken);
        this.setUser();
      })
    );
  }

  verifyPasswordlessLogin(token: string): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.apiUrl}/users/verify-token/`, {
        token: token,
      })
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
          this.tokenStorage.saveRefreshToken(
            authenticationResponse.refreshtoken
          );
          this.setUser();
        })
      );
  }

  delete() {
    const req = this.http.delete(`${this.apiUrl}/users/${this.user$.value.id}`);
    this.logout();
    return req;
  }

  logout(): void {
    this.tokenStorage.clear();
    this.router.navigate(['']);
    this.user$.next({
      email: '',
      id: 0,
      role: '',
      permissions: [],
    });
  }

  checkIfUserExists(): void {
    const accessToken = this.tokenStorage.getAccessToken();
    if (accessToken == null) {
      return;
    }
    this.setUser();
  }

  private setUser(): void {
    const jwtHelperService = new JwtHelperService();
    const accessToken = this.tokenStorage.getAccessToken() || '';
    const decodedToken = jwtHelperService.decodeToken(accessToken);
    const user: AuthUser = {
      id: +decodedToken.id,
      email: decodedToken.email,
      role: decodedToken.role,
      permissions: decodedToken.permissions,
    };
    this.user$.next(user);
  }

  getCurrentUser(): Observable<AuthUser> {
    return this.user$.asObservable();
  }

  addPermission(role: string, permission: string) {
    const url = `${this.apiUrl}/users/role/${role}/permission/${permission}`;
    return this.http.post(url, {});
  }

  removePermission(role: string, permission: string) {
    const url = `${this.apiUrl}/users/role/${role}/permission/${permission}`;
    return this.http.delete(url);
  }
  blockUser(userId: number): Observable<void> {
    console.log('OJSA');
    return this.http.post<void>(`${this.apiUrl}/users/${userId}/block`, {
      userId,
    });
  }

  updateUser(userId: number, user: User): Observable<User> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.put<User>(url, user);
  }

  unblockUser(userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users/${userId}/unblock`, {
      userId,
    });
  }
}

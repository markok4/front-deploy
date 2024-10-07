import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  otpLoginForm: FormGroup;
  email: string;

  captchaResolved: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.otpLoginForm = this.fb.group({
      token: ['', Validators.required],
    });
  }

  openPasswordlessLoginPage() {
    this.router.navigate(['/passwordless-login']);
  }

  openForgotPasswordPage() {
    this.router.navigate(['/reset-password']);
  }

  login() {
    const credentials = this.loginForm.value;

    this.userService.login(credentials).subscribe({
      next: (result) => {
        this.email = (result as any).email;
        this.snackBar.open('Credentials are right, enter token!', 'Close', {
          duration: 3000,
        });
      },
      error: (err) => {
        this.snackBar.open('Login failed, please try again', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  verifyOtpLogin() {
    const credentials = this.otpLoginForm.value;

    this.userService.verifyOtpToken(credentials.token, this.email).subscribe({
      next: (result) => {
        this.snackBar.open('Successfully logged in', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.snackBar.open(
          'OTP verification failed, please try again',
          'Close',
          {
            duration: 3000,
          }
        );
      },
    });
  }

  onCaptchaResolved(event: any) {
    this.captchaResolved = true;
  }
}

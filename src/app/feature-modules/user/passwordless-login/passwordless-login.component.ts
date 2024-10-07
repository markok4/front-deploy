import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-passwordless-login',
  templateUrl: './passwordless-login.component.html',
  styleUrls: ['./passwordless-login.component.css'],
})
export class PasswordlessLoginComponent {
  loginForm: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  login() {
    const credentials = this.loginForm.value;

    this.userService.passwordlessLogin(credentials).subscribe({
      next: (result) => {
        this.snackBar.open('Email sent', 'Close', {
          duration: 3000,
        });
      },
      error: (error) => {
        this.snackBar.open(
          'Error sending email. Please try again later.',
          'Close',
          {
            duration: 3000,
          }
        );
      },
    });
  }
}

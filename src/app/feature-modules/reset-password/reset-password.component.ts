import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otpToken: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Logovanje statusa forme za debagovanje
    this.resetPasswordForm.statusChanges.subscribe((status) => {
      console.log('Form status:', status);
      console.log('Form errors:', this.resetPasswordForm.errors);
      console.log(
        'Email control:',
        this.resetPasswordForm.get('email')?.errors
      );
      console.log(
        'OTP Token control:',
        this.resetPasswordForm.get('otpToken')?.errors
      );
      console.log(
        'New Password control:',
        this.resetPasswordForm.get('newPassword')?.errors
      );
    });
  }

  onSubmit(): void {
    console.log('Form submitted');
    console.log('Form values:', this.resetPasswordForm.value); // Dodato logovanje za debagovanje

    if (this.resetPasswordForm.valid) {
      const { email, otpToken, newPassword } = this.resetPasswordForm.value;
      this.http
        .post<any>('https://localhost:8089/users/reset-password', {
          email,
          otpToken,
          newPassword,
        })
        .subscribe(
          (response) => {
            if (response.success) {
              this.message = 'Password reset successfully';
              this.router.navigate(['/login']); // Redirect to login page
            } else {
              this.message = `Error: ${response.message}`;
            }
          },
          (error) => {
            this.message = 'An error occurred. Please try again.';
          }
        );
    } else {
      console.log('Form is invalid'); // Dodato logovanje za debagovanje
    }
  }
}

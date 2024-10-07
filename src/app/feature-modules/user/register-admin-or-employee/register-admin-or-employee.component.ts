import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';
import { CustomValidators } from 'src/app/shared/custom-validators';

@Component({
  selector: 'app-register-admin-or-employee',
  templateUrl: './register-admin-or-employee.component.html',
  styleUrls: ['./register-admin-or-employee.component.css'],
})
export class RegisterAdminOrEmployeeComponent implements OnInit {
  userForm: FormGroup;
  qrCode: string = '';
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      role: ['admin', Validators.required], // Default to admin
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          CustomValidators.specialCharacter,
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(15),
        ],
      ], // Only letters, max 15 characters
      surname: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(15),
        ],
      ], // Only letters, max 15 characters
      companyName: [{ value: '', disabled: true }, Validators.maxLength(15)], // Max 15 characters, initially disabled
      pib: [{ value: '', disabled: true }, Validators.pattern('[0-9]{10}')], // Exactly 10 numbers, initially disabled
      address: ['', [Validators.required, Validators.maxLength(20)]], // Max 20 characters
      city: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(20),
        ],
      ], // Only letters, max 20 characters
      country: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(20),
        ],
      ], // Only letters, max 20 characters
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^0[0-9]{8,9}$')], // Starts with 0 and has 9 or 10 digits
      ],
    });
  }

  isRoleAdmin() {
    return this.userForm.get('role')!.value === 'employee';
  }

  ngOnInit(): void {
    this.userForm.get('role')!.valueChanges.subscribe((role) => {
      const companyNameControl = this.userForm.get('companyName');
      const pibControl = this.userForm.get('pib');

      if (role === 'admin') {
        companyNameControl?.disable();
        pibControl?.disable();
      } else {
        companyNameControl?.enable();
        pibControl?.enable();
      }
    });
  }

  saveUser() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      const role = userData.role;
      delete userData.role;

      if (role === 'admin') {
        this.userService.registerAdmin(userData).subscribe({
          next: (result: any) => {
            const qrCodeUrl = result.value.qrCodeUrl;

            this.qrCode = qrCodeUrl;
            this.snackBar.open('Admin registered successfully', 'Close', {
              duration: 3000,
            });
            this.userForm.reset();
            this.userForm.get('role')?.setValue('admin');
          },
          error: (error) => {
            console.error('Registration error:', error);
            this.snackBar.open('Error occurred while registering', 'Close', {
              duration: 3000,
            });
          },
        });
      } else if (role === 'employee') {
        this.userService.registerEmployee(userData).subscribe({
          next: (result: any) => {
            const qrCodeUrl = result.value.qrCodeUrl;
            this.qrCode = qrCodeUrl;
            this.snackBar.open('Employee registered successfully', 'Close', {
              duration: 3000,
            });
            this.userForm.reset();
            this.userForm.get('role')?.setValue('admin');
          },
          error: (error) => {
            console.error('Registration error:', error);
            this.snackBar.open('Error occurred while registering', 'Close', {
              duration: 3000,
            });
          },
        });
      }
    } else {
      this.snackBar.open('Please fill all required fields correctly', 'Close', {
        duration: 3000,
      });
    }
  }

  cancelEdit() {
    this.userForm.reset();
    this.userForm.get('role')?.setValue('admin');
  }
}

import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css'],
})
export class RegisterClientComponent {
  userForm: FormGroup;
  qrCode: string = '';
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      type: ['PHYSICAL_PERSON', Validators.required], // Default to admin
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: [''],
      surname: [''],
      companyName: [''],
      pib: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      package: ['BASIC', Validators.required],
    });
  }

  isTypePhysicalPerson() {
    return this.userForm.get('type')!.value === 'PHYSICAL_PERSON';
  }

  register() {
    const userData = this.userForm.value;
    this.userForm.reset();
    this.userForm.get('type')?.setValue('PHYSICAL_PERSON');
    this.userForm.get('package')?.setValue('BASIC');

    console.log(userData);

    this.userService.registerClient(userData).subscribe({
      next: (result: any) => {
        const qrCodeUrl = result.value.qrCodeUrl;

        this.qrCode = qrCodeUrl;

        this.snackBar.open('Register successful', 'Close', {
          duration: 3000,
        });
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.snackBar.open('Error occurred while registering', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}

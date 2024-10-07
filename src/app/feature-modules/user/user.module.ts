import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterAdminOrEmployeeComponent } from './register-admin-or-employee/register-admin-or-employee.component';
import { LoginComponent } from './login/login.component';
import { EditPermissionsComponent } from './edit-permissions/edit-permissions.component';
import { ClientProfileComponent } from './advertisement/client-profile/client-profile.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile/employee-profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PasswordlessLoginComponent } from './passwordless-login/passwordless-login.component';
import { VerifyComponent } from './verify/verify.component';
import { VerifyPasswordlessLoginComponent } from './verify-passwordless-login/verify-passwordless-login.component';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AdminProfileComponent,
    RegisterAdminOrEmployeeComponent,
    LoginComponent,
    EditPermissionsComponent,
    PasswordlessLoginComponent,
    VerifyComponent,
    VerifyPasswordlessLoginComponent,
    ClientProfileComponent,
    EmployeeProfileComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RecaptchaModule,
  ],
  exports: [LoginComponent],
})
export class UserModule {}

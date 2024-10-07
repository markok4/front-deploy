import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature-modules/layout/home/home.component';
import { AdminProfileComponent } from './feature-modules/user/admin-profile/admin-profile.component';
import { RegisterAdminOrEmployeeComponent } from './feature-modules/user/register-admin-or-employee/register-admin-or-employee.component';
import { LoginComponent } from './feature-modules/user/login/login.component';
import { RegisterClientComponent } from './feature-modules/register-client/register-client.component';
import {
  PasswordGuard,
  PermissionGuard,
} from './infrastructure/auth/auth.guard';
import { EditPermissionsComponent } from './feature-modules/user/edit-permissions/edit-permissions.component';
import { ClientProfileComponent } from './feature-modules/user/advertisement/client-profile/client-profile.component';
import { RegistrationRequestsComponent } from './feature-modules/registration-requests/registration-requests.component';
import { PasswordlessLoginComponent } from './feature-modules/user/passwordless-login/passwordless-login.component';
import { VerifyComponent } from './feature-modules/user/verify/verify.component';
import { VerifyPasswordlessLoginComponent } from './feature-modules/user/verify-passwordless-login/verify-passwordless-login.component';
import { ResetPasswordComponent } from './feature-modules/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [PasswordGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: AdminProfileComponent },
      {
        path: 'register-admin-or-employee',
        component: RegisterAdminOrEmployeeComponent,
        canActivate: [PermissionGuard],
        data: { permissions: ['register_admin', 'register_employee'] },
      },
      { path: 'login', component: LoginComponent },
      { path: 'client-profile', component: ClientProfileComponent },
      { path: 'passwordless-login', component: PasswordlessLoginComponent },
      {
        path: 'edit-permissions',
        component: EditPermissionsComponent,
        canActivate: [PermissionGuard],
        data: { permissions: ['edit_permissions'] },
      },
      {
        path: 'register-client',
        component: RegisterClientComponent,
      },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'user/verify/:id', component: VerifyComponent },
      {
        path: 'verify-token/:token',
        component: VerifyPasswordlessLoginComponent,
      },
    ],
  },
  {
    path: 'register-client',
    component: RegisterClientComponent,
  },
  {
    path: 'registration-requests',
    component: RegistrationRequestsComponent,
    data: {
      permissions: [
        'read_pending_registrations',
        'accept_registration',
        'decline_registration',
      ],
    },
  },
  // TODO: Odkomentarises ovo samo kada napravis komponentu
  //   {
  //     path: "set-password",
  //     component: SetPasswordComponent,
  //     canActivate: [NoPasswordGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

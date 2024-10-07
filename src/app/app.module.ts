import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserModule } from './feature-modules/user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LayoutModule } from './feature-modules/layout/layout.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterClientComponent } from './feature-modules/register-client/register-client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './infrastructure/auth/jwt.interceptor';
import {
  MatSelect,
  MatSelectChange,
  MatSelectModule,
} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { RegistrationRequestsComponent } from './feature-modules/registration-requests/registration-requests.component';
import { ResetPasswordComponent } from './feature-modules/reset-password/reset-password.component';
import { LoginComponent } from './feature-modules/user/login/login.component';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent,
    RegisterClientComponent,
    RegistrationRequestsComponent,
    ResetPasswordComponent,
  ],
  imports: [
    LayoutModule,
    BrowserModule,
    AppRoutingModule,
    UserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    MatSelectModule,
    RecaptchaModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

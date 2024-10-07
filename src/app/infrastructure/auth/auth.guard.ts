import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUser } from './model/user.model';
import { UserService } from 'src/app/feature-modules/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: UserService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user: AuthUser = this.authService.user$.getValue();
    if (user.email === '') {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router, private authService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const permissions = route.data['permissions'] as string[];
    const user: AuthUser = this.authService.user$.getValue();
    if (
      user.email === '' ||
      !permissions.every((x) => user.permissions.includes(x))
    ) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PasswordGuard implements CanActivateChild {
  constructor(private router: Router, private authService: UserService) {}

  canActivateChild():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user: AuthUser = this.authService.user$.getValue();
    if (user.email === '') {
      return true;
    }
    // TODO: Dodaj ovo na beku i frontu u model i token (shouldSetPassword)
    // if (user.shouldSetPassword) {
    //     this.router.navigate(["set-password"]);
    //     return false;
    // }
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class NoPasswordGuard implements CanActivate {
  constructor(private router: Router, private authService: UserService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user: AuthUser = this.authService.user$.getValue();
    if (user.email === '') {
      return false;
    }
    // TODO: Dodaj ovo na beku i frontu u model i token (shouldSetPassword)
    // if (user.shouldSetPassword) {
    //   return true;
    // }
    return true;
  }
}

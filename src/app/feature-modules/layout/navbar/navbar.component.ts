import { Component } from '@angular/core';
import { RoleValues, User } from '../../user/models/user-model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private userService: UserService) {}

  role: string;
  email: string;
  permissions: string[];
  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.permissions = user.permissions;
      this.email = user.email;
      this.role = user.role;
    });
  }

  logout() {
    this.userService.logout();
  }

  delete() {
    this.userService.delete().subscribe((x) => console.log('done'));
  }

  hasPermission(perm: string[]) {
    if (!this.permissions) return false;
    return perm.every((x) => this.permissions.includes(x));
  }
  isClient() {
    return this.role == 'CLIENT';
  }
}

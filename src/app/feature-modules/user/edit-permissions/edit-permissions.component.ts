import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-permissions',
  templateUrl: './edit-permissions.component.html',
  styleUrls: ['./edit-permissions.component.css'],
})
export class EditPermissionsComponent {
  selectedValue: string;
  textInput: string;
  options: string[] = ['ADMIN', 'CLIENT', 'EMPLOYEE'];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  add() {
    this.userService
      .addPermission(this.selectedValue, this.textInput)
      .subscribe(
        (result: any) => {
          this.snackBar.open(result.message, 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          this.snackBar.open(error.error.error, 'Close', {
            duration: 3000,
          });
        }
      );
  }
  remove() {
    this.userService
      .removePermission(this.selectedValue, this.textInput)
      .subscribe(
        (result: any) => {
          this.snackBar.open(result.message, 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          this.snackBar.open(error.error.error, 'Close', {
            duration: 3000,
          });
        }
      );
  }
}

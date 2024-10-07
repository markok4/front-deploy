import { Component, OnInit } from '@angular/core';
import { User } from '../user/models/user-model';
import { UserService } from '../user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.css'],
})
export class RegistrationRequestsComponent implements OnInit {
  requests: User[];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.userService.getRegistrationRequests().subscribe((result) => {
      this.requests = result.value;
      console.log(result);
    });
  }

  onApprove(requestId: number) {
    this.userService.approveRegistrationRequest(requestId).subscribe({
      next: () => {
        this.snackBar.open('Email sent', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  onDecline(requestId: number) {
    this.userService.declineRegistrationRequest(requestId).subscribe({
      next: () => {
        this.snackBar.open('Request declined', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}

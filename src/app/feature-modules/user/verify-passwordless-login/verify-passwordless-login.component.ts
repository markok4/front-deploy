import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-verify-passwordless-login',
  templateUrl: './verify-passwordless-login.component.html',
  styleUrls: ['./verify-passwordless-login.component.css'],
})
export class VerifyPasswordlessLoginComponent {
  constructor(
    private route: ActivatedRoute,
    private authService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verify();
  }

  verify() {
    const param = this.route.snapshot.paramMap.get('token');
    if (param) {
      this.authService.verifyPasswordlessLogin(param).subscribe({
        next: () => {
          this.router.navigate(['']);
        },
      });
    }
  }
}

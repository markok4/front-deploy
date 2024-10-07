import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent {
  constructor(
    private route: ActivatedRoute,
    private authService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verify();
  }

  verify() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.authService.verify(param).subscribe({
        next: () => {
          this.router.navigate(['']);
        },
      });
    }
  }
}

import { Component } from '@angular/core';
import { UserService } from './feature-modules/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'fiji-boys';
  constructor(private authService: UserService) {}

  ngOnInit(): void {
    this.checkIfUserExists();
  }

  private checkIfUserExists(): void {
    this.authService.checkIfUserExists();
  }
}

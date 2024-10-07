import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  User,
  RoleValues,
  RegistrationValues,
  UserResponse,
} from '../models/user-model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  user: User;
  clients: UserResponse[];
  employees: UserResponse[];
  userForm: FormGroup;
  roles = RoleValues;
  registrations = RegistrationValues;
  isEditing = false;
  editedUserId: number;
  userId: number;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(15),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(15),
        ],
      ],
      address: ['', [Validators.required, Validators.maxLength(20)]], // Max 20 characters
      city: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(20),
        ],
      ], // Only letters, max 20 characters
      country: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.maxLength(20),
        ],
      ], // Only letters, max 20 characters
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^0[0-9]{8,9}$')], // Starts with 0 and has 9 or 10 digits
      ],
    });
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.userId = user.id;
    });
    this.loadUser();
    this.loadClients();
    this.loadEmployees();
  }

  loadUser() {
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.user = user;
      this.userForm.patchValue({
        email: user.email,
        companyName: user.companyName,
        pib: user.pib,
        name: user.name,
        surname: user.surname,
        address: user.address,
        city: user.city,
        country: user.country,
        phoneNumber: user.phoneNumber,
      });
    });
  }

  loadClients() {
    this.userService.getClients().subscribe((result) => {
      this.clients = result;
    });
  }

  loadEmployees() {
    this.userService.getEmployees().subscribe((result) => {
      this.employees = result;
    });
  }

  saveUser() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      this.userService.updateUser(this.userId, user).subscribe(() => {
        this.loadUser();
        this.isEditing = false;
        this.editedUserId = 0;
        this.userForm.reset();
        this.snackBar.open('Profile updated successfully', 'Close', {
          duration: 3000,
        });
      });
    } else {
      this.snackBar.open('Please fill all required fields correctly', 'Close', {
        duration: 3000,
      });
    }
  }

  cancelEdit() {
    this.editedUserId = 0;
    this.loadUser();
  }
  blockUser(userId: number) {
    this.userService.blockUser(userId).subscribe(
      () => {
        this.loadClients();
        this.loadEmployees();
        this.snackBar.open('Korisnik uspešno blokiran', 'Zatvori', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Greška prilikom blokiranja korisnika:', error);
        this.snackBar.open(
          'Došlo je do greške prilikom blokiranja korisnika',
          'Zatvori',
          {
            duration: 3000,
          }
        );
      }
    );
  }
  unblockUser(userId: number) {
    this.userService.unblockUser(userId).subscribe(
      () => {
        this.loadClients();
        this.loadEmployees();
        this.snackBar.open('Korisnik uspešno blokiran', 'Zatvori', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Greška prilikom blokiranja korisnika:', error);
        this.snackBar.open(
          'Došlo je do greške prilikom blokiranja korisnika',
          'Zatvori',
          {
            duration: 3000,
          }
        );
      }
    );
  }
}

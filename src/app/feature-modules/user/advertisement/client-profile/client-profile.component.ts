import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user-model';
import { UserService } from '../../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Advertisement } from '../../models/advertisement-model';
@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css'],
})
export class ClientProfileComponent implements OnInit {
  user: User;
  isEditing = false;
  editedUserId: number;
  userId: number;
  userForm: FormGroup;
  advertisementForm: FormGroup;
  employees: any[];

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
      companyName: [{ value: '', disabled: true }],
      pib: [{ value: '', disabled: true }],
      name: [''],
      surname: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      isDeleted: [{ value: false, disabled: true }],
      isActive: [{ value: false, disabled: true }],
    });
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.userId = user.id;
    });
    this.loadEmployees();
    this.loadUser();
    this.advertisementForm = this.fb.group({
      description: [''],
      startDate: [''],
      endDate: [''],
      employeeId: [1],
    });
  }

  loadEmployees() {
    this.userService.getEmployeesByName().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.log('Error fetching employees:', error);
      }
    );
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
        isDeleted: user.isDeleted,
        isActive: user.isActive,
      });
    });
  }

  onEmployeeSelect(event: any) {
    const selectedEmployeeId = event.value;
  }
  saveUser() {
    if (this.userForm.valid) {
      const { name, surname, address, city, country, phoneNumber } =
        this.userForm.value;
      const userDataToUpdate: Partial<User> = {
        name,
        surname,
        address,
        city,
        country,
        phoneNumber,
      };
      this.userService.getUserById(this.userId).subscribe((user) => {
        const updatedUser: User = { ...user, ...userDataToUpdate };
        this.userService.updateUser(this.userId, updatedUser).subscribe(() => {
          this.loadUser();
          this.isEditing = false;
          this.editedUserId = 0;
          this.userForm.reset();
          this.snackBar.open('Profile updated successfully', 'Close', {
            duration: 3000,
          });
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
  createAdvertisement(advertisementData: any): void {
    if (this.advertisementForm.valid) {
      this.userService.createAdvertisement(advertisementData).subscribe(
        (response) => {
          console.log('Advertisement created successfully!', response);
        },
        (error) => {
          console.error('Error creating advertisement:', error);
        }
      );
    } else {
      console.error(
        'Form is not valid. Please fill in all required information.'
      );
    }
  }
}

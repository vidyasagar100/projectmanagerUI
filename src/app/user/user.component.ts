import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../classes/User';
import { UserService } from '../user/user.services'
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  userViewForm: FormGroup;
  userList: User[];
  filteredUserList: User[];

  button: string = "Add";

  searchName: string;
  showMsg: boolean = false;
  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    console.log('inside nginit');
    this.initForm();
    this.getUsers();
    this.searchName = '';
  }


  private initForm() {
    this.userForm = new FormGroup({
      'userId': new FormControl(''),
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'employeeId': new FormControl('', Validators.required)
    });
    this.userViewForm = new FormGroup({
      'userId': new FormControl(),
      'firstName': new FormControl(),
      'lastName': new FormControl(),
      'employeeId': new FormControl(),
      'searchName': new FormControl()
    });
    this.button = "Add";
  }

  clear() {
    this.userForm.controls['firstName'].setValue('');
    this.userForm.controls['lastName'].setValue('');
    this.userForm.controls['employeeId'].setValue('');
    this.userForm.controls['userId'].setValue('');
  }

  submit() {
    if (this.userForm.valid) {
      var user = new User();
      user.firstName = this.userForm.controls['firstName'].value;
      user.lastName = this.userForm.controls['lastName'].value;
      user.employeeId = this.userForm.controls['employeeId'].value;
      if (this.userForm.controls['userId'].value) {
        user.userId = this.userForm.controls['userId'].value;
        var returnUser = this.userService.updateUser(user).subscribe((result) => this.getUsers());
        this.button = "Add";
      }
      else {
        this.userService.saveUser(user).subscribe((result) => this.getUsers());
      }
      this.showMsg = true;
      this.userForm.reset();
      this.userViewForm.reset();
      this.searchName = '';
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe
      (
        data => {
          this.userList = data;
          this.filteredUserList = data;
        }
      );
  }

  sortByFirstName() {
    const filterBy: string = this.userViewForm.controls['searchName'].value;
    this.filteredUserList.sort((user1, user2) => (user1.firstName.localeCompare(user2.firstName)));
  }

  sortBylastName() {
    const filterBy: string = this.userViewForm.controls['searchName'].value;
    this.filteredUserList.sort((user1, user2) => (user1.lastName.localeCompare(user2.lastName)));
  }

  sortByEmployeeId() {
    const filterBy: string = this.userViewForm.controls['searchName'].value;
    this.filteredUserList.sort((user1, user2) => user1.employeeId - user2.employeeId);
  }

  filterUsers() {
    const filterBy: string = this.userViewForm.controls['searchName'].value;
    this.filteredUserList = this.userList.filter(user => user.firstName.toLowerCase().includes(filterBy.toLowerCase()) || user.lastName.toLowerCase().includes(filterBy.toLowerCase()) || String(user.employeeId).includes(filterBy));
  }

  deleteUser(userId: HTMLLIElement) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Are you sure want to delete the user?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(userId.value).subscribe((result) => this.getUsers());
      }
    });
  }

  editUser(userId: HTMLLIElement) {
    const selectedUser: User[] = this.userList.filter(user => user.userId == userId.value);
    this.userForm.reset();
    this.userForm.controls['firstName'].setValue(selectedUser[0].firstName);
    this.userForm.controls['lastName'].setValue(selectedUser[0].lastName);
    this.userForm.controls['employeeId'].setValue(selectedUser[0].employeeId);
    this.userForm.controls['userId'].setValue(selectedUser[0].userId);
    this.button = "Edit";
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../classes/User';
import { DialogData } from '../classes/dialog.data';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.services';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  managerForm: FormGroup;
  managerControl = new FormControl();
  users: User[];
  filtereUsers: Observable<User[]>;

  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<ManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    this.managerForm = new FormGroup({
    });
    this.userService.getUsers().subscribe
      (
        result => {
          this.users = result;
        }
      );
  }

  displayName(user?: User) {
    return user ? user.firstName + ' ' + user.lastName : ' ';
  }
}

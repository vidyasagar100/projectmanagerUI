import { Component, OnInit, Inject } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder,FormGroup, FormControl } from '@angular/forms';
import { ProjectService } from '../project/project.services';
import { User } from '../classes/User';
import { DialogData } from '../classes/dialog.data';
import { Observable } from 'rxjs' ;



@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {


  managerForm : FormGroup;

  managerControl = new FormControl();

  users: User[];
  filtereUsers: Observable<User[]>;
 
  
  constructor(private projectService: ProjectService,
              public dialogRef: MatDialogRef<ManagerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
               
                
              }

  ngOnInit() {
    this.managerForm = new FormGroup({
    });

    this.projectService.getUsers().subscribe
    (
      result=>
      {
        this.users = result;
      }
    );
    
  }

  displayName(user?: User) {
    console.log("called"+user);
    return user ? user.firstName + ' ' +user.lastName: ' ';
      
  }

}

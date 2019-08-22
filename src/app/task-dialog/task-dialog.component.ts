import { Component, OnInit, Inject } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder,FormGroup, FormControl } from '@angular/forms';
import { TaskService } from '../task/task.services';
import { User } from '../classes/User';
import { DialogData } from '../classes/dialog.data';
import { Observable } from 'rxjs' ;
import { Task } from '../classes/Task';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {


  tasks: Task[];

 
  
  constructor(private taskService: TaskService,
              public dialogRef: MatDialogRef<TaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
               
                
              }

  ngOnInit() {
    this.taskService.getTasks().subscribe
    (
      result=>
      {
        this.tasks = result;
        console.log(":::size::"+this.tasks.length);
      }
    );
    
  }

  displayName(task?: Task) {
    console.log("called"+task);
    return task ? task.taskDesc: ' ';
      
  }
}

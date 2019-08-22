import { Component, OnInit } from '@angular/core';
import { Task } from '../classes/task';
import {FormGroup, FormControl}from '@angular/forms';
import {filter}from 'rxjs/operators';
import { Observable}from 'rxjs';
import { isNgTemplate}from '@angular/compiler';
import {formatDate}from '@angular/common';
import {MatFormFieldControl,MatDialog,MatDialogConfig}from '@angular/material';
import {BrowserAnimationsModule}from '@angular/platform-browser/animations';
import { MaterialModule } from "../material/material.module";
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { ManagerComponent } from '../manager/manager.component';
import { TaskService } from '../task/task.services';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {


  taskType : boolean;

  constructor(public dialog: MatDialog, private taskService:TaskService ) { }

  ngOnInit() {
  this.initForm();
  }

  taskForm: FormGroup;

  initForm(){
  this.taskForm = new FormGroup({
        'projectId': new FormControl(),
        'projectDesc': new FormControl(),
        'task': new FormControl(),
        'taskType': new FormControl(),
        'parentTask': new FormControl(),
        'parentTaskId': new FormControl(),
        'priority': new FormControl(),
        'startDate': new FormControl(),
        'endDate': new FormControl(),
        'userId': new FormControl(),
        'userName': new FormControl()
      });
      this.taskType = false;
      this.taskForm.get('taskType').setValue(false);
      this.setDefaultDate();
  }

  changeTaskType() {
    console.log('Task type called'+this.taskForm.get('taskType').value);
    if(this.taskForm.get('taskType').value) {
      //child Task
      this.taskType = false;
      this.taskForm.get('taskType').setValue(this.taskType);
      this.taskForm.controls['startDate'].enable();
      this.taskForm.controls['endDate'].enable();
      this.taskForm.controls['priority'].enable();
      this.setDefaultDate();
  }
  else {
    //Parent Task
    this.taskType = true;
    this.taskForm.get('taskType').setValue(this.taskType);
    this.taskForm.controls['startDate'].setValue('');
    this.taskForm.controls['endDate'].setValue('');
    this.taskForm.controls['priority'].setValue('');
    this.taskForm.controls['startDate'].disable();
    this.taskForm.controls['endDate'].disable();
    this.taskForm.controls['priority'].disable();
  }
  }

  setDefaultDate() {
    var tommorow = new Date();
    tommorow.setDate(tommorow.getDate()+1);
    this.taskForm.controls['startDate'].setValue(formatDate(Date.now(),'yyyy-MM-dd','en'));
    this.taskForm.controls['endDate'].setValue(formatDate(tommorow,'yyyy-MM-dd','en'));
  }

  addProject() {
    const dialogConfig = new MatDialogConfig();
   dialogConfig.width = "35%";
   dialogConfig.height = "35%";
   dialogConfig.data = { projectDesc: '', lastName:''};
   const dialogRef = this.dialog.open(ProjectDialogComponent,dialogConfig);

   dialogRef.afterClosed().subscribe(result => {
    console.log('back'+result.projectDesc);
    this.taskForm.get('projectDesc').setValue(result.projectDesc);
   this.taskForm.get('projectId').setValue(result.projectId);
  });
  }

  addParentTask() {
    const dialogConfig = new MatDialogConfig();
   dialogConfig.width = "35%";
   dialogConfig.height = "35%";
   dialogConfig.data = { task: ''};
   const dialogRef = this.dialog.open(TaskDialogComponent,dialogConfig);

   dialogRef.afterClosed().subscribe(result => {
    console.log('back'+result.taskDesc);
    console.log('back'+result.taskId);
    this.taskForm.get('parentTask').setValue(result.taskDesc);
   this.taskForm.get('parentTaskId').setValue(result.taskId);
  });
  }

  addUser() {
    const dialogConfig = new MatDialogConfig();
   dialogConfig.width = "35%";
   dialogConfig.height = "35%";
   dialogConfig.data = { firstName: '', lastName:''};
   const dialogRef = this.dialog.open(ManagerComponent,dialogConfig);

   dialogRef.afterClosed().subscribe(result => {
    this.taskForm.get('userName').setValue(result.firstName + " " + result.lastName);
    this.taskForm.get('userId').setValue(result.userId);
  });
}

clearValue() {
  this.taskType = false;
  this.taskForm.get('taskType').setValue(false);
  this.taskForm.reset();
  this.initForm();

}

saveTask() {
  if(this.taskForm.valid){
    var task = new Task();
    task.projectId =  this.taskForm.controls['projectId'].value;
    task.taskDesc = this.taskForm.controls['task'].value;
    if(this.taskForm.get('taskType').value) {
      task.userId = this.taskForm.controls['userId'].value;
      console.log("parent task");
    }
    else {
      task.parentId = this.taskForm.controls['parentTaskId'].value;
      task.priority = this.taskForm.controls['priority'].value;
      task.startDate = this.taskForm.controls['startDate'].value;
      task.endDate = this.taskForm.controls['endDate'].value;
      console.log("child task");
    }
    this.taskService.saveProject(task).subscribe((result)=>  {
      //this.getTask();
      console.log('saved:::::::');
    });
    this.taskForm.reset();
    }
}
}

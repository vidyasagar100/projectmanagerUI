import { Component, OnInit } from '@angular/core';
import { Task } from '../classes/task';
import { FormGroup, FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';
import { formatDate } from '@angular/common';
import { MAT_CHECKBOX_CLICK_ACTION, MatDialog, MatDialogConfig } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "../material/material.module";
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { ManagerComponent } from '../manager/manager.component';
import { TaskService } from '../task/task.services';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from '../project/project.services';
import { UserService } from '../user/user.services';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [{ provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' }]
})
export class TaskComponent implements OnInit {

  taskService: TaskService;
  dialog: MatDialog;
  projectService: ProjectService;
  userService: UserService;
  route: ActivatedRoute;
  editTaskId: string;
  taskForm: FormGroup;
  taskType: boolean;
  editTask: Task;
  message: string;

  constructor(dialog: MatDialog, taskService: TaskService, projectService: ProjectService, userService: UserService);
  constructor(dialog: MatDialog, taskService: TaskService, projectService: ProjectService, userService: UserService, route?: ActivatedRoute) {
    this.taskService = taskService;
    this.dialog = dialog;
    this.projectService = projectService;
    this.userService = userService;
    this.route = route;
  }

  ngOnInit() {
    this.message = '';
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.editTaskId = params.get('id');
      }
    });
    this.initForm();
    if (this.editTaskId) {
      this.setEditValues();
    }
  }

  setEditValues() {
    this.taskService.getTasksById(this.editTaskId).subscribe(result => {
      this.editTask = result;
      this.taskForm.get('task').setValue(this.editTask.taskDesc);
      this.taskForm.get('taskId').setValue(this.editTask.taskId);
      this.taskForm.get('projectId').setValue(this.editTask.projectId);
      this.projectService.getProjectById(this.editTask.projectId).subscribe(result => {
        this.taskForm.get('projectDesc').setValue(result.projectDesc);
      });
   
      if (this.editTask.parentId) {
        this.taskForm.get('taskType').disabled;
        this.taskType = false;
        this.taskForm.get('parentTaskId').setValue(this.editTask.parentId);
        this.taskForm.get('startDate').setValue(this.editTask.startDate);
        this.taskForm.get('endDate').setValue(this.editTask.endDate);
        this.taskForm.get('priority').setValue(this.editTask.priority);
        this.taskService.getTasksById(String(this.editTask.parentId)).subscribe(result => {
          this.taskForm.get('parentTask').setValue(result.taskDesc);
        });
      } else {
        this.taskType = true;
        this.taskForm.get('taskType').enabled;
        this.taskForm.get('userId').setValue(this.editTask.userId);
        this.taskForm.get('endDate').setValue('');
        this.taskForm.get('startDate').setValue('');
        this.userService.getUserById(this.editTask.userId).subscribe(result => {
          this.taskForm.get('userName').setValue(result.firstName + ' ' + result.lastName);
          this.taskForm.get('userId').setValue(result.userId);
        })
      }
    });


  }

  initForm() {
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
      'userName': new FormControl(),
      'taskId': new FormControl()
    });
    this.taskType = false;
    this.setDefaultDate();
  }

  changeTaskType() {
    if (this.taskForm.controls['taskId'].value) {
      return false;
    }
    else {
      if (this.taskType) {
        //Parent Task
        this.taskType = false;
        this.taskForm.controls['startDate'].enable();
        this.taskForm.controls['endDate'].enable();
        this.taskForm.controls['priority'].enable();
        this.setDefaultDate();
      }
      else {
        //child Task
        this.taskType = true;
        this.taskForm.controls['startDate'].setValue('');
        this.taskForm.controls['endDate'].setValue('');
        this.taskForm.controls['priority'].setValue('');
        this.taskForm.controls['startDate'].disable();
        this.taskForm.controls['endDate'].disable();
        this.taskForm.controls['priority'].disable();
      }

    }
  }
  setDefaultDate() {
    var tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    this.taskForm.controls['startDate'].setValue(formatDate(Date.now(), 'yyyy-MM-dd', 'en'));
    this.taskForm.controls['endDate'].setValue(formatDate(tommorow, 'yyyy-MM-dd', 'en'));
  }

  addProject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "35%";
    dialogConfig.height = "35%";
    dialogConfig.data = { projectDesc: '', lastName: '' };
    const dialogRef = this.dialog.open(ProjectDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.taskForm.get('projectDesc').setValue(result.projectDesc);
      this.taskForm.get('projectId').setValue(result.projectId);
    });
  }

  addParentTask() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "35%";
    dialogConfig.height = "35%";
    dialogConfig.data = { task: '' };
    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.taskForm.get('parentTask').setValue(result.taskDesc);
      this.taskForm.get('parentTaskId').setValue(result.taskId);
    });
  }

  addUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "35%";
    dialogConfig.height = "35%";
    dialogConfig.data = { firstName: '', lastName: '' };
    const dialogRef = this.dialog.open(ManagerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.taskForm.get('userName').setValue(result.firstName + " " + result.lastName);
      this.taskForm.get('userId').setValue(result.userId);
    });
  }

  clearValues() {
     this.taskForm.reset();
     
    this.initForm();
    this.taskType = false;
  }

  saveTask() {
    if (this.taskForm.valid) {
      var task = new Task();
      task.projectId = this.taskForm.controls['projectId'].value;
      task.taskDesc = this.taskForm.controls['task'].value;
      if (this.taskType) {
        task.userId = this.taskForm.controls['userId'].value;
      }
      else {
        task.parentId = this.taskForm.controls['parentTaskId'].value;
        task.priority = this.taskForm.controls['priority'].value;
        task.startDate = this.taskForm.controls['startDate'].value;
        task.endDate = this.taskForm.controls['endDate'].value;
      }
      if (this.taskForm.controls['taskId'].value) {
        this.taskService.updateTask(this.taskForm.controls['taskId'].value, task).subscribe((result) => {
        });
      } else {
        this.taskService.saveTask(task).subscribe((result) => {
        });

      }
      this.taskForm.reset();
      this.taskType = false;
      this.message = "Saved Sucessfully";
    } else {
      this.message = "error";
    }
  }
}

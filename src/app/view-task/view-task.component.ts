import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { TaskService } from '../task/task.services';
import { Task } from '../classes/Task';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(public dialog: MatDialog, private taskService: TaskService) { }

  ngOnInit() {
    this.initForm();
  }

  taskForm: FormGroup;
  taskList: Task[];
  filteredTaskList: Task[];

  initForm() {
    this.taskForm = new FormGroup({
      'projectId': new FormControl(),
      'projectDesc': new FormControl()
      /*  'task': new FormControl(),
       'taskType': new FormControl(),
       'parentTask': new FormControl(),
       'parentTaskId': new FormControl(),
       'priority': new FormControl(),
       'startDate': new FormControl(),
       'endDate': new FormControl(),
       'userId': new FormControl(),
       'userName': new FormControl() */
    });
  }

  searchProject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "35%";
    dialogConfig.height = "35%";
    dialogConfig.data = { projectDesc: '', lastName: '' };
    const dialogRef = this.dialog.open(ProjectDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('back' + result.projectDesc);
      this.taskForm.get('projectDesc').setValue(result.projectDesc);
      this.taskForm.get('projectId').setValue(result.projectId);
      this.getTasks(result.projectId);
    });
  }


  getTasks(projectId) {
    this.taskService.getTasksByProjectId(projectId).subscribe(result => {
      console.log("::::getTasks:::::" + result);
      this.taskList = result;
      this.filteredTaskList = result;
    });
  }

  sortByStartDate() {
    this.filteredTaskList.sort((task1, task2) => {
      return this.getTime(new Date(task1.startDate)) - this.getTime(new Date(task2.startDate));
    });
  }

  sortByEndDate() {
    this.filteredTaskList.sort((task1, task2) => {
      return this.getTime(new Date(task1.endDate)) - this.getTime(new Date(task2.endDate));
    });
  }

  
  sortByPriority() {
    this.filteredTaskList.sort(((task1, task2) => task1.priority - task2.priority));
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }
  /* 
  
                <button mat-icon-button (click)="sortByEndDate()">End Date</button>&nbsp;&nbsp;
                <button mat-icon-button (click)="sortByPriority()">Priority</button>&nbsp;&nbsp;
                <button mat-icon-button (click)="sortByCompleted()">Completed</button>
                */



}

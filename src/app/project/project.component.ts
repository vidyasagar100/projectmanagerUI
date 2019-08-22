import{Component, OnInit, Inject}from '@angular/core';
import {FormGroup, FormControl}from '@angular/forms';
import {Project}from '../classes/Project';
import { Observable}from 'rxjs';
import {formatDate}from '@angular/common';
import {MatDialog,MatDialogConfig, MatDialogRef,MAT_DIALOG_DATA}from '@angular/material/dialog';
import {ManagerComponent} from '../manager/manager.component';
import {ProjectService}from '../project/project.services'
import {DialogData} from '../classes/dialog.data';
import { User } from '../classes/User';

@Component({
selector: 'project',
templateUrl: './project.component.html',
styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

projectForm : FormGroup;
projectViewForm : FormGroup;

constructor(private projectService: ProjectService,
    public dialog: MatDialog)  {
  }

  projectList:Project[];
  projectFilteredList:Project[]
  returnproject:Observable<Project>;
  name:string;
  button: string = "Add";
  date: boolean;
  userId: number;
  showMsg : boolean = false;

  ngOnInit() {
    this.initForm();
    this.getProject();
  }

getProject() {
  this.projectService.getProjects().subscribe
  (
    data=>
    {
       this.projectList = data;
       this.projectFilteredList = data;
    }
  );
}

  private initForm() {
    this.projectForm = new FormGroup({
      'projectId': new FormControl(),
      'projectDesc': new FormControl(),
      'date': new FormControl(),
      'startDate': new FormControl(),
      'endDate': new FormControl(),
      'priority': new FormControl(),
      'managerId': new FormControl(),
      'managerName': new FormControl()
    });
    this.projectViewForm = new FormGroup({
      'projectId': new FormControl(),
      'projectDesc': new FormControl(),
      'date': new FormControl(),
      'startDate': new FormControl(),
      'endDate': new FormControl(),
      'priority': new FormControl(),
      'managerId': new FormControl(),
      'searchProject': new FormControl()
    });
    this.projectForm.controls['startDate'].disable();
    this.projectForm.controls['endDate'].disable();
    this.projectForm.patchValue({date:true,priority:0});
    this.projectForm.get('date').setValue(true);
    //this.date = true;
  }

  clearValue() {
    this.projectForm.reset();
  }

  changeDate(){
    if(this.projectForm.get('date').value) {
      this.projectForm.get('date').setValue(false);
      this.projectForm.controls['startDate'].enable();
      this.projectForm.controls['endDate'].enable();
      var tommorow = new Date();
      tommorow.setDate(tommorow.getDate()+1);
      this.projectForm.controls['startDate'].setValue(formatDate(Date.now(),'yyyy-MM-dd','en'));
      this.projectForm.controls['endDate'].setValue(formatDate(tommorow,'yyyy-MM-dd','en'));
    }
    else {
      this.projectForm.get('date').setValue(true);
      this.projectForm.controls['startDate'].setValue('');
      this.projectForm.controls['endDate'].setValue('');
      this.projectForm.controls['startDate'].disable();
      this.projectForm.controls['endDate'].disable();

    }
  }

  addManager() {
   const dialogConfig = new MatDialogConfig();
  // dialogConfig.disableClose = true;
   //dialogConfig.autoFocus = true;
   dialogConfig.width = "35%";
   dialogConfig.height = "35%";
   dialogConfig.data = { firstName: '', lastName:''};
  // dialogConfig.data = new User();
   const dialogRef = this.dialog.open(ManagerComponent,dialogConfig);

   dialogRef.afterClosed().subscribe(result => {
     this.name = result.firstName + " " + result.lastName;
     this.userId = result.userId;
    this.projectForm.get('managerId').setValue(this.userId);
    this.projectForm.get('managerName').setValue(this.name);
  });
}

  onSubmit() {
    if(this.projectForm.valid){
    var project = new Project();
    project.projectDesc =  this.projectForm.controls['projectDesc'].value;
    project.startDate = this.projectForm.controls['startDate'].value;
    project.endDate = this.projectForm.controls['endDate'].value;
    project.priority = this.projectForm.controls['priority'].value; 
    project.managerId = this.projectForm.controls['managerId'].value;
    if (this.projectForm.controls['projectId'].value == null) {
      this.projectService.saveProject(project).subscribe((result) =>  {
        this.getProject();
      });
    }
    else if(this.projectForm.controls['projectId'].value != null) {
      project.projectId = this.projectForm.controls['projectId'].value;
      var returnProject = this.projectService.updateProject(project).subscribe((result) => this.getProject());
      this.button = "Add";
    }
    this.showMsg = true;
    this.projectForm.reset();
    this.projectViewForm.reset();
    this.date = false;
    
  }
}
  sortByFirstDate() {
    const filterBy: string = this.projectViewForm.controls['searchProject'].value;
    this.projectFilteredList.sort((project1,project2) => {
       return this.getTime(new Date(project1.startDate)) - this.getTime(new Date(project2.startDate)); 
    }  
    );
  }

  private getTime(date?: Date){
    return date != null ? date.getTime() : 0;
  }

  sortByLastDate() {
    const filterBy: string = this.projectViewForm.controls['searchProject'].value;
    this.projectFilteredList.sort((project1,project2) => {
       return this.getTime(new Date(project1.endDate)) - this.getTime(new Date(project2.endDate)); 
    }  
    );
  }

  sortByPriorityId() {
    const filterBy: string = this.projectViewForm.controls['searchProject'].value;
    this.projectFilteredList.sort((project1, project2) => project1.priority - project2.priority);
  }
  
  sortByCompletedDate() {
/*     const filterBy: string = this.projectViewForm.controls['searchName'].value;
    this.filteredUserList.sort((user1, user2) => user1.employeeId - user2.employeeId); */
  }

  filterProjects() {
    const filterBy: string = this.projectViewForm.controls['searchProject'].value;
    this.projectFilteredList = this.projectList.filter(project => project.projectDesc.toLowerCase().includes(filterBy.toLowerCase()));
  }


  updateProject(projectId: HTMLLIElement) {
    const selectedProject: Project[] = this.projectList.filter(project => project.projectId == projectId.value);
    this.projectForm.reset();
    this.projectForm.controls['projectDesc'].setValue(selectedProject[0].projectDesc);
    this.projectForm.controls['projectId'].setValue(selectedProject[0].projectId);
    this.date = true;
    this.projectForm.controls['startDate'].setValue(selectedProject[0].startDate);
    this.projectForm.controls['endDate'].setValue(selectedProject[0].endDate);
    this.projectForm.controls['priority'].setValue(selectedProject[0].priority);
    this.projectForm.controls['startDate'].enable();
    this.projectForm.controls['endDate'].enable();
    //this.projectForm.controls['managerId'].setValue(selectedProject[0].managerId);
    this.button = "Edit";
  }

  completeProject(projectId: HTMLLIElement) {
    const selectedProject: Project[] = this.projectList.filter(project => project.projectId == projectId.value);
    var project = new Project();
    project.projectDesc =  selectedProject[0].projectDesc;
    project.startDate = selectedProject[0].startDate;
    project.endDate = selectedProject[0].endDate;
    project.priority = selectedProject[0].priority; 
    project.managerId = selectedProject[0].managerId;
    project.projectId = selectedProject[0].projectId;
    project.status = 'Completed';
    var returnProject = this.projectService.updateProject(project).subscribe((result) => this.getProject());
  }
  
  suspendProject(projectId: HTMLLIElement) {
    const selectedProject: Project[] = this.projectList.filter(project => project.projectId == projectId.value);
    var project = new Project();
    project.projectDesc =  selectedProject[0].projectDesc;
    project.startDate = selectedProject[0].startDate;
    project.endDate = selectedProject[0].endDate;
    project.priority = selectedProject[0].priority; 
    project.managerId = selectedProject[0].managerId;
    project.projectId = selectedProject[0].projectId;
    project.status = 'Suspend';
    var returnProject = this.projectService.updateProject(project).subscribe((result) => this.getProject());
  }
}
import { Component, OnInit, Inject } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder,FormGroup, FormControl } from '@angular/forms';
import { ProjectService } from '../project/project.services';
import { User } from '../classes/User';
import { DialogData } from '../classes/dialog.data';
import { Observable } from 'rxjs' ;
import { Project } from '../classes/Project';


@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {

  projects: Project[];

 
  
  constructor(private projectService: ProjectService,
              public dialogRef: MatDialogRef<ProjectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
               
                
              }

  ngOnInit() {


    this.projectService.getProjects().subscribe
    (
      result=>
      {
        this.projects = result;
      }
    );
    
  }

  displayName(project?: Project) {
    console.log("called"+project);
    return project ? project.projectDesc: ' ';
      
  }
}

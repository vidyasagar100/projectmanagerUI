import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ConfigService } from './config.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule,MatSliderModule,MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION} from '@angular/material';
import { MatDialogModule,MatAutocompleteModule,MatDividerModule,MatInputModule} from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { HttpClientModule} from '@angular/common/http'
import { ProjectService } from './project/project.services';
import { UserService } from './user/user.services';
import { TaskService } from './task/task.services';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManagerComponent } from './manager/manager.component';
import { MaterialModule } from "./material/material.module";
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { UserComponent } from './user/user.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    ManagerComponent,
    ProjectComponent,
    TaskComponent,
    UserComponent,
    ConfirmationDialogComponent,
    ProjectDialogComponent,
    TaskDialogComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDividerModule,
    FormsModule,
    MatInputModule,
    RouterModule.forRoot([
      {
        path:'task/:id',
        component: TaskComponent
      }
    ])
   ],
   exports: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    ManagerComponent,
    ProjectComponent,
    TaskComponent,
    UserComponent,
    ConfirmationDialogComponent,
    ProjectDialogComponent,
    TaskDialogComponent,
    ViewTaskComponent
   ],
  providers: [ConfigService, ProjectService, UserService, TaskService, NgbModule, {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}],
  bootstrap: [AppComponent],
  entryComponents: [ManagerComponent, NavigationComponent, ProjectDialogComponent, TaskDialogComponent, ConfirmationDialogComponent]
})
export class AppModule {
  }

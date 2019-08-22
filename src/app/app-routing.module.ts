import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { UserComponent } from './user/user.component';
import { ViewTaskComponent } from './view-task/view-task.component';


const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full'},
  { path: 'Home', component: HeaderComponent},
  { path: 'project', component: ProjectComponent},
  { path: 'task', component: TaskComponent},
  { path: 'user', component: UserComponent},
  { path: 'viewtask', component: ViewTaskComponent} 
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

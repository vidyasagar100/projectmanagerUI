import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Task } from '../classes/task';
import { environment } from 'src/environments/environment';

@Injectable()
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<any> {
    const url = environment.url.concat("tasks");
    return this.httpClient.get(url);
  }

  saveTask(task: Task) {
    const url = environment.url.concat("task/create");
    return this.httpClient.post<Task>(url, task);
  }

  getTasksByProjectId(projectId: number): Observable<any> {
    const url = environment.url.concat("tasks/project/".concat(String(projectId)));
    return this.httpClient.get(url);
  }

  getTasksById(taskId: string): Observable<any> {
    const url = environment.url.concat("tasks/".concat(taskId));
    return this.httpClient.get<Task>(url);
  }

  updateTask(taskId: string, task: Task) {
    const url = environment.url.concat("task/update/".concat(taskId));
    return this.httpClient.put<Task>(url, task);
  }
}

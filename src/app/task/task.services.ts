import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Task } from '../classes/task';

@Injectable()
export class TaskService {

  task;

  constructor(private httpClient: HttpClient) { }

  saveTask(task: Task): Observable<Task> {
    return null;
  }

  getTasks(): Observable<any> {
    return this.httpClient.get("http://localhost:9000/api/tasks");
  }

  saveProject(task: Task) {
    return this.httpClient.post<Task>("http://localhost:9000/api/task/create", task);
  }

  getTasksByProjectId(projectId: number): Observable<any> {
    const url = "http://localhost:9000/api/tasks/project/".concat(String(projectId));
    return this.httpClient.get(url);
  }

}

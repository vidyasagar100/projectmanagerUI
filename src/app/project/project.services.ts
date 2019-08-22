
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Project } from '../classes/Project';

@Injectable()
export class ProjectService {

    project;

    constructor(private httpClient: HttpClient) {}

    getProjects(): Observable<any> {
         return this.httpClient.get("http://localhost:9000/api/projects");
        }

    saveProject(project: Project): Observable<Project> {
        return this.httpClient.post<Project>("http://localhost:9000/api/projects/create",project);
    }

    getUsers(): Observable<any> {
        return this.httpClient.get("http://localhost:9000/api/users");
    }

    updateProject(project: Project): Observable<Project> {
        const url = "http://localhost:9000/api/projects/update/".concat(String(project.projectId));
        return this.httpClient.put<Project>(url, project);   
    }
}
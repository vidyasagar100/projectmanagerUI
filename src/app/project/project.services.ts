import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Project } from '../classes/Project';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProjectService {

    constructor(private httpClient: HttpClient) { }

    getProjects(): Observable<any> {
        const url = environment.url.concat("projects");
        return this.httpClient.get(url);
    }

    saveProject(project: Project): Observable<Project> {
        const url = environment.url.concat("projects/create");
        return this.httpClient.post<Project>(url, project);
    }

    updateProject(project: Project): Observable<Project> {
        const url = environment.url.concat("projects/update/".concat(String(project.projectId)));
        return this.httpClient.put<Project>(url, project);
    }

    getProjectById(projectId: number) {
        const url = environment.url.concat("projects/".concat(String(projectId)));
        return this.httpClient.get<Project>(url);
    }
}
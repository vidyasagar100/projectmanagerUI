import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/User';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) { }

    saveUser(user: User): Observable<User> {
        const url = environment.url.concat("users/create");
        return this.httpClient.post<User>(url, user);
    }

    getUsers(): Observable<any> {
        const url = environment.url.concat("users");
        return this.httpClient.get(url);
    }

    deleteUser(userId: number): Observable<void> {
        const url = environment.url.concat("users/delete/".concat(String(userId)));
        return this.httpClient.delete<void>(url);
    }

    updateUser(user: User): Observable<User> {
        const url = environment.url.concat("users/update/".concat(String(user.userId)));
        return this.httpClient.put<User>(url, user);
    }

    getUserById(userId: number): Observable<User> {
        const url = environment.url.concat("users/get/".concat(String(userId)));
        return this.httpClient.get<User>(url);
    }
}
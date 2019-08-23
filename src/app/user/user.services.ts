import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/User';
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable()
export class UserService {

    user;
    delFlag: boolean;

    constructor(private httpClient: HttpClient) { }

    saveUser(user: User): Observable<User> {
        return this.httpClient.post<User>("http://localhost:9000/api/users/create", user);
    }

    getUsers(): Observable<any> {
        console.log('getting all users');
        return this.httpClient.get("http://localhost:9000/api/users");
    }

    deleteUser(userId: number): Observable<void> {
        const url = "http://localhost:9000/api/users/delete/".concat(String(userId));
        return this.httpClient.delete<void>(url);
    }

    updateUser(user: User): Observable<User> {
        const url = "http://localhost:9000/api/users/update/".concat(String(user.userId));
        return this.httpClient.put<User>(url, user);
    }
}
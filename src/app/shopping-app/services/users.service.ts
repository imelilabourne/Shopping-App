import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usersUrl } from '../config/api';
import { User } from '../model/user.interface';

@Injectable({
    providedIn: 'root'
})

export class UsersService{
    constructor(private http: HttpClient){}

    getUsers():Observable<User[]>{
        return this.http.get<User[]>(usersUrl);
    }
}
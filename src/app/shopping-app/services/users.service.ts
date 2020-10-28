import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usersUrl } from '../config/api';
import { User } from '../model/user.interface';

@Injectable({
    providedIn: 'root'
})


export class UsersService{

    private loggedInStatus = false;
    constructor(private http: HttpClient){}

    setLoggegIn(value: boolean){
        this.loggedInStatus = value;
    }

    get isLoggedIn(){
        return this.loggedInStatus;
    }
    
    getUsers():Observable<User[]>{
        return this.http.get<User[]>(usersUrl);
    }

    postUser(user: User):Observable<User>{
        return this.http.post<User>(usersUrl, user);
    }

    removeUser(user: User):Observable<User>{
        return this.http.delete<User>(usersUrl + '/' + user.id);
    }
}
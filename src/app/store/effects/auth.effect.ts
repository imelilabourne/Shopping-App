import { Injectable } from '@angular/core';
import { Effect , Actions, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { UsersService } from 'src/app/shopping-app/services';
import { LoadUser, LoadUserSuccess, LOAD_USERS } from '../actions/auth.action';


@Injectable({
    providedIn: 'root'
})

export class AuthEffect{
    constructor(private action$: Actions, private userService: UsersService){}

    @Effect()
    loadUsers$ = this.action$
        .pipe(
            ofType<LoadUser>(LOAD_USERS),
            mergeMap(() => this.userService.getUsers()
            .pipe(
                map(data => new LoadUserSuccess(data))
            )
        ))
}
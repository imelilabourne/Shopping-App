import { User } from "src/app/shopping-app/model/user.interface";

export const LOAD_USERS = '[User LOAD]';
export const LOAD_USERS_SUCCESS = '[User LOAD_SUCCESS]';

export class LoadUser{
    readonly type = LOAD_USERS;
}

export class LoadUserSuccess {
    readonly type = LOAD_USERS_SUCCESS;
    constructor(public payload: User[]){}
}

export type UserActions = 
        LoadUser 
    |   LoadUserSuccess
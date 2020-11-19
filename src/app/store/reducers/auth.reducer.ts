import { User } from "src/app/shopping-app/model/user.interface";
import { LOAD_USERS, LOAD_USERS_SUCCESS, UserActions } from "../actions/auth.action";

const initialstate: UserState = {
    list: []

}

export interface UserState {
    list: User[];
}


export function authReducer(state: UserState = initialstate, action: UserActions){
    switch(action.type){
        case LOAD_USERS:
            return {
                ...state
            }
        case LOAD_USERS_SUCCESS:
            return {
                ...state,
                list: action.payload    
            }
    }
}
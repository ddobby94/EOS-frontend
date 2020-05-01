import { 
    LOGIN_START, 
    LOGIN_START_SUCCESS, 
    LOGIN_START_ERROR,
} from "./actionTypes";
import Services from '../../services';
import { fetchActionHandler } from "../helpers";
import { SimpleAction } from "../helpers/types";

export const loginStartAction: SimpleAction = () => ({
    type: LOGIN_START,
});

export const loginSuccessAction: SimpleAction = (user) => ({
    type: LOGIN_START_SUCCESS,
    user,
});

export const loginErrorAction: SimpleAction = (error) => ({
    type: LOGIN_START_ERROR,
    error,
});

export const fetchAuthData = () => {
    const types = [
        loginStartAction, 
        loginSuccessAction, 
        loginErrorAction,
    ];

    return fetchActionHandler(types, Services.auth.fetchTestData);
};

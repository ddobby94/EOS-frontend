import {
    LOGIN_START,
    LOGIN_START_SUCCESS,
    LOGIN_START_ERROR,
    REGISTER_START,
    REGISTER_START_SUCCESS,
    REGISTER_START_ERROR,
} from "./actionTypes";
import Services from '../../services';
import { fetchActionHandler } from "../helpers";
import { SimpleAction } from "../helpers/types";

// -------------------- Actions --------------------

export const loginStartAction: SimpleAction = (detials) => ({
    type: LOGIN_START,
    payload: detials,
});

export const loginSuccessAction: SimpleAction = (user) => ({
    type: LOGIN_START_SUCCESS,
    user,
});

export const loginErrorAction: SimpleAction = (error) => ({
    type: LOGIN_START_ERROR,
    error,
});

export const registertStart: SimpleAction = (details) => ({
    type: REGISTER_START,
    payload: details
});

export const registerSuccessAction: SimpleAction = (user, details) => ({
    type: REGISTER_START_SUCCESS,
    user,
    details,
});

export const registerErrorAction: SimpleAction = (error) => ({
    type: REGISTER_START_ERROR,
    error,
});

// -------------------- API callers --------------------

export const fetchAuthData = (...detials) => {
    const types = [
        loginStartAction,
        loginSuccessAction,
        loginErrorAction,
    ];

    return fetchActionHandler(types, Services.auth.fetchTestData, detials);
};

export const registerFetch = (details) => {
    const types = [
        registertStart,
        registerSuccessAction,
        registerErrorAction,
    ];

    return fetchActionHandler(types, Services.auth.sendRegisterData, details);
};

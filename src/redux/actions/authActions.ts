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
import { SimpleAction, SendLoginDetails, SendRegisterDetails } from "../helpers/types";

// -------------------- Actions --------------------

export const loginStartAction: SimpleAction = (detials) => ({
    type: LOGIN_START,
    payload: detials,
});

export const loginSuccessAction: SimpleAction = (user, details: SendLoginDetails) => ({
    type: LOGIN_START_SUCCESS,
    payload: {
        user,
        email: details.email,
    }
});

export const loginErrorAction: SimpleAction = (error) => ({
    type: LOGIN_START_ERROR,
    error,
});

export const registertStart: SimpleAction = (details) => ({
    type: REGISTER_START,
    payload: details
});

export const registerSuccessAction: SimpleAction = (user, details: SendRegisterDetails) => ({
    type: REGISTER_START_SUCCESS,
    user,
    details,
});

export const registerErrorAction: SimpleAction = (error) => ({
    type: REGISTER_START_ERROR,
    error,
});

// -------------------- API caller ACTIONS --------------------

export const sendLoginAction = (detials: SendLoginDetails) => {
    const types = [
        loginStartAction,
        loginSuccessAction,
        loginErrorAction,
    ];

    return fetchActionHandler(types, Services.auth.sendLogin, [detials]);
};

export const registerFetch = (details: SendRegisterDetails) => {
    const types = [
        registertStart,
        registerSuccessAction,
        registerErrorAction,
    ];

    return fetchActionHandler(types, Services.auth.sendRegisterData, [details]);
};

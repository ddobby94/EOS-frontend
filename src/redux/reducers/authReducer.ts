import {
    LOGIN_START,
    LOGIN_START_SUCCESS,
    LOGIN_START_ERROR,
} from "../actions/actionTypes";
import { createReducer } from "../helpers";
import { AuthState, StoreReducerSelector } from '../helpers/types';
import { initialAuthState } from "../helpers/store";

export const authReducer = createReducer<AuthState>({
    [LOGIN_START]: (state) => ({
        ...state,
        loading: true,
        loggedIn: true,
        error: null,
    }),
    [LOGIN_START_SUCCESS]: (state, { user }) => ({
        ...state,
        user,
        loggedIn: true,
        loading: false,
    }),
    [LOGIN_START_ERROR]: (state, { error }) => ({
        ...state,
        error,
        loggedIn: true,
        loading: false,
    }),
}, initialAuthState);

export default authReducer;

// ---------------------- Selectors ----------------------

const selectAuthStateItem: StoreReducerSelector<AuthState> = (s) => s.authReducer;

export const isUserLoggedIn = (s) => selectAuthStateItem(s).loggedIn;
export const getUser = (s) => selectAuthStateItem(s).user;
export const getAuthLoading = (s) => selectAuthStateItem(s).loading;
export const getAuthError = (s) => selectAuthStateItem(s).error;

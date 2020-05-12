import {
    LOGIN_START,
    LOGIN_START_SUCCESS,
    LOGIN_START_ERROR,
} from "../actions/actionTypes";
import { createReducer } from "../helpers";
import { AuthState, StoreReducerSelector } from '../helpers/types';

export const authReducer = createReducer({
    [LOGIN_START]: (state) => ({
        ...state,
        loading: true
    }),
    [LOGIN_START_SUCCESS]: (state, { user }) => ({
        ...state,
        user,
    }),
    [LOGIN_START_ERROR]: (state, { error }) => ({
        ...state,
        error,
    }),
});

export default authReducer;

// ---------------------- Selectors ----------------------

const selectAuthStateItem: StoreReducerSelector<AuthState> = (s) => s.authReducer;

export const getUser = (s) => selectAuthStateItem(s).user;
export const getAuthLoading = (s) => selectAuthStateItem(s).loading;
export const getAuthError = (s) => selectAuthStateItem(s).error;

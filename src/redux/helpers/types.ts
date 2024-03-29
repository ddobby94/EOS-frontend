// eslint-disable @typescript-eslint/no-explicit-any
import { SimpleObject } from "../../types/commonTypes";
import { RouterState } from "connected-react-router";
import { SingleProject } from "../../containers/_types/Project.types";

// Action detial types

export interface SendLoginDetails {
    email: string;
    password: string;
}

export interface SendRegisterDetails extends SendLoginDetails {
    fullName: string;
    companyName: string;
}

export type SimpleAction = (...args) => SimpleObject;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FetchSuccessAction = (response: SimpleObject, args: any[]) => SimpleObject;
export type FetchErrorAction = (error: SimpleObject | string) => SimpleObject;

// Store state

interface BaseState {
    loading: boolean;
    error: string | null;
}

export interface AuthState extends BaseState {
    loggedIn: boolean;
    user: {
        activeToken?: string;
        refreshToken?: string;
        userId?: string;
        name?: string;
    }
};

export interface ProjectState extends BaseState  {
    editing: SingleProject;
    previousProjects: SimpleObject<SingleProject>;
}

export interface StoreInterface {
    router: RouterState,
    authReducer: AuthState,
    project: ProjectState,
}

export type StoreReducerSelector<T> = (s: StoreInterface) => T;

 /* eslint-disable @typescript-eslint/no-explicit-any */

export type FetchActionHandler = (
    types: SimpleAction[],
    serviceCall: (...args) => Promise<any>,
    args?: any[],
) => ((dispatch) => void);

/* eslint-enable @typescript-eslint/no-explicit-any */

export interface ReducerObject<T = AuthState> {
    [key: string]: (state: T, action) => T;
};

export type PayloadType<T> = {
    payload: T
}

export type SuccessPayload = {
    payload: {
        response: SimpleObject;
        args: any[];
    }
}

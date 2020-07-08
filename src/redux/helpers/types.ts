import { SimpleObject } from "../../types/commonTypes";
import { RouterState } from "connected-react-router";

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

export interface AuthState {
    loading: boolean;
    error: string | null;
    loggedIn: boolean;
    user: {
        activeToken?: string;
        refreshToken?: string;
        userId?: string;
        name?: string;
    }
};

export interface ProjectState {
    editing: {
        selectedFile?: File,
        meta: {
            datasetName: string;
            title: string;
        },
        data: {

        }
    }
    previousProjects: SimpleObject;
}

export interface StoreInterface {
    router: RouterState,
    authReducer: AuthState,
    project: ProjectState,
}

export type StoreReducerSelector<T> = (s: StoreInterface) => T;

export type FetchActionHandler = (
    types: SimpleAction[],
    serviceCall: (...args) => Promise<any>,
    args?: any[],
) => ((dispatch) => void);

export interface ReducerObject<T = AuthState> {
    [key: string]: (state: T, action) => T;
};

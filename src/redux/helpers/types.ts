import { SimpleObject } from "../../types/commonTypes";
import { RouterState } from "connected-react-router";
import { Filter } from "../../containers/_types/Project.types";
import { Variable } from '../../components/_types/DataTable';
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
        }
        filters: Filter[];
        variables: SimpleObject<Variable>;
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

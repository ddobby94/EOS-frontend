import { SimpleObject } from "../../types/commonTypes";
import { RouterState } from "connected-react-router";

export type SimpleAction = (...args) => SimpleObject;

export interface AuthState {
    loading: boolean;
    error: string | null;
    user: {
        userId?: string;
        name?: string;
    }
};

export interface StoreInterface {
    router: RouterState,
    fuelSavings: {},
    authReducer: AuthState,
}

export type StoreReducerSelector<T> = (s: StoreInterface) => T;

export type FetchActionHandler = (
    types: SimpleAction[],
    serviceCall: (...args) => Promise<any>,
    args?: any[],
) => ((dispatch: any) => void);

export interface ReducerObject<T = AuthState> {
    [key: string]: (state: T, action) => T;
};

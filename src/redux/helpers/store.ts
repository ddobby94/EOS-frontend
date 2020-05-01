import { RouterState } from "connected-react-router";

export interface AuthState {
    loading: boolean;
    error: string | null;
    user: {
        userId?: string;
        name?: string;
    }
};

export type StoreReducerSelector<T> = (s: StoreInterface) => T;

export const initialState: AuthState = {
    loading: false,
    error: null,
    user: {},
};

export interface StoreInterface {
    router: RouterState,
    fuelSavings: {},
    authReducer: AuthState,
}

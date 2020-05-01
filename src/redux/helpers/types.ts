import { SimpleObject } from "../../types/commonTypes";
import { AuthState } from './store';

export type SimpleAction = (...args) => SimpleObject;
export type FetchActionHandler = (
    types: SimpleAction[],
    serviceCall: (...args) => Promise<any>,
    args?: any[],
) => ((dispatch: any) => void);

export interface ReducerObject<T = AuthState> {
    [key: string]: (state: T, action) => T;
};

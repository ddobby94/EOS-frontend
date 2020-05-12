import { RouteComponentProps } from 'react-router-dom';
import * as React from "react";

export interface SimpleObject<T = any> {
    [key: string]: T
};

export type fetchFunction = (url: string, options?: SimpleObject) => Promise<any>;

export type FunctionComponentInRoute = React.FunctionComponent<RouteComponentProps>;

export type onChange<T = void> = (e: React.ChangeEvent<HTMLInputElement>) => T;

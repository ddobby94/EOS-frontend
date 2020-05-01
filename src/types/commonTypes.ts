import { RouteComponentProps } from 'react-router-dom';
import * as React from "react";

export interface SimpleObject<T = any> {
    [key: string]: T
};

export type FunctionComponentInRoute = React.FunctionComponent<RouteComponentProps>;

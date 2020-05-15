import { AuthState } from "../../redux/helpers/types";
import { RouteChildrenProps } from "react-router-dom";


export interface DashboardProps extends RouteChildrenProps {
    fetchAuthData: (email: string, pwd: string) => void;
    user: AuthState['user'];
    children: string;
    isLoading: boolean;
};

export interface DashboardStates {
    open: boolean,
    active: number,
};

export type DashboardStateItem = keyof DashboardStates;

export interface DashboardFuncTypes {
    changeState:  (k: DashboardStateItem, val: any) => void;
    toggleSideBar: () => void;
}

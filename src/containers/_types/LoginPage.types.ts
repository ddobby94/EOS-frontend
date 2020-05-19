import { AuthState } from "../../redux/helpers/types";
import { onChange } from "../../types/commonTypes";
import { RouteChildrenProps } from "react-router-dom";


export interface LoginPageProps extends RouteChildrenProps {
    fetchAuthData: (email: string, pwd: string) => void;
    user: AuthState['user'];
    children: string;
    isLoading: boolean;
};

export interface LoginPageStates {
    isRegister: boolean;
    email: string;
    pwd: string;
    confirmPwd: string;
    name: string;
    companyName: string;
};

export type LoginPageStateItem = keyof LoginPageStates;

export interface InputProps {
    onChange: onChange,
    label: string;
    value: string;
    [k: string]: any,
};

export interface LoginPageFuncTypes {
    onChangeHandler: (k: LoginPageStateItem, e: React.ChangeEvent<HTMLInputElement>) => void;
    changeState:  (k: LoginPageStateItem, val: any) => void;
}

import { RouterState } from "connected-react-router";
import { StoreReducerSelector } from "../helpers/types";

const selectRouter: StoreReducerSelector<RouterState> = (s) => s.router;

export const getStepCountFromURL = (s) => {
    const found = (selectRouter(s).location.search.match(/step=\d/g) || ['step=0'])[0].split('=')[1];

    return Number(found);
};

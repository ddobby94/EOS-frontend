import {
    SET_PROJECT_TITLE,
    SET_SELECTED_FILE,
    ADD_NEW_FILTER,
} from "./actionTypes";
// import Services from '../../services';
// import { fetchActionHandler } from "../helpers";
import { SimpleAction } from "../helpers/types";
import { Filter } from "../../containers/_types/Project.types";

// -------------------- Actions --------------------

export const setProjectTitle: SimpleAction = (title) => {
    return {
        type: SET_PROJECT_TITLE,
        payload: title,
    }
};

export const setSelectedFile: SimpleAction = (file: File) => {
    return {
        type: SET_SELECTED_FILE,
        payload: file,
    }
};

export const addNewFilter: SimpleAction = (filter: Filter) => {
    return {
        type: ADD_NEW_FILTER,
        payload: filter,
    }
}

// -------------------- API callers --------------------

// export const sendLoginAction = (...detials) => {
//     const types = [
//         loginStartAction,
//         loginSuccessAction,
//         loginErrorAction,
//     ];

//     return fetchActionHandler(types, Services.auth.fetchTestData, detials);
// };

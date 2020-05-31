import {
    SET_PROJECT_TITLE,
    SET_SELECTED_FILE,
} from "./actionTypes";
// import Services from '../../services';
// import { fetchActionHandler } from "../helpers";
import { SimpleAction } from "../helpers/types";

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

// -------------------- API callers --------------------

// export const fetchAuthData = (...detials) => {
//     const types = [
//         loginStartAction,
//         loginSuccessAction,
//         loginErrorAction,
//     ];

//     return fetchActionHandler(types, Services.auth.fetchTestData, detials);
// };

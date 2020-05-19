import {
    SET_PROJECT_TITLE,
} from "./actionTypes";
// import Services from '../../services';
// import { fetchActionHandler } from "../helpers";
import { SimpleAction } from "../helpers/types";

// -------------------- Actions --------------------

export const setProjectTitle: SimpleAction = (title) => {
    console.log({ title });
    return {type: SET_PROJECT_TITLE,
    payload: title,}
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

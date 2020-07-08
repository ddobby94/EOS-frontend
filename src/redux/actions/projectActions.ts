import {
    SET_PROJECT_TITLE,
    SET_SELECTED_FILE,
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
} from "./actionTypes";
import Services from '../../services';
import { SimpleAction, FetchSuccessAction, FetchErrorAction } from "../helpers/types";
import { fetchActionHandler } from "../helpers";

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

export const uploadStart: SimpleAction = (selectedFile: File) => ({
    type: UPLOAD_FILE,
    payload: selectedFile,
});

export const uploadSuccessAction: FetchSuccessAction = (response, args) => ({
    type: UPLOAD_FILE_SUCCESS,
    payload: {
        response,
        selectedFile: args[0],
    },
});

export const uploadErrorAction: FetchErrorAction = (error) => ({
    type: UPLOAD_FILE_ERROR,
    error,
});

// -------------------- API callers --------------------

export const uploadSelectedFile = (...detials) => {
    const types = [
        uploadStart,
        uploadSuccessAction,
        uploadErrorAction,
    ];

    return fetchActionHandler(types, Services.project.uploadFile, detials);
}

// export const sendLoginAction = (...detials) => {
//     const types = [
//         loginStartAction,
//         loginSuccessAction,
//         loginErrorAction,
//     ];

//     return fetchActionHandler(types, Services.auth.fetchTestData, detials);
// };

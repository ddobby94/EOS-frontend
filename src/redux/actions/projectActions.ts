import {
    SET_PROJECT_TITLE,
    SET_SELECTED_FILE,
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
    ADD_NEW_FILTER,
} from "./actionTypes";
import Services from '../../services';
import { SimpleAction, FetchSuccessAction, FetchErrorAction } from "../helpers/types";
import { fetchActionHandler } from "../helpers";
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

export const addNewFilter: SimpleAction = (filter: Filter) => {
    return {
        type: ADD_NEW_FILTER,
        payload: filter,
    }
}

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

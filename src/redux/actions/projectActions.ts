import {
    SET_PROJECT_TITLE,
    SET_SELECTED_FILE,
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
    ADD_NEW_FILTER,
    SET_TARGET_VARIABLE,
    REMOVE_FILTER,
    TOGGLE_FILTER_ISACTIVE,
    GENERATE_SAMPLE,
    GENERATE_SAMPLE_SUCCESS,
    GENERATE_SAMPLE_ERROR,
} from "./actionTypes";
import Services from '../../services';
import { SimpleAction, FetchSuccessAction, FetchErrorAction } from "../helpers/types";
import { fetchActionHandler } from "../helpers";
import { Filter, generateRequestPayload } from "../../containers/_types/Project.types";
import { Variable } from "../../components/_types/DataTable";

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

export const generateStart: SimpleAction = (...details: generateRequestPayload) => ({
    type: GENERATE_SAMPLE,
    payload: {
        activeFilters: details[0],
        metaData: details[1],
        target: details[2],
    },
});

export const generateSuccessAction: FetchSuccessAction = (response, args) => ({
    type: GENERATE_SAMPLE_SUCCESS,
    payload: {
        response,
        selectedFile: args[0],
    },
});

export const generateErrorAction: FetchErrorAction = (error) => ({
    type: GENERATE_SAMPLE_ERROR,
    error,
});

export const addNewFilter: SimpleAction = (filter: Filter) => ({
    type: ADD_NEW_FILTER,
    payload: filter,
});

export const removeFilter: SimpleAction = (id: string) => ({
    type: REMOVE_FILTER,
    payload: id,
});

export const toggleFilter: SimpleAction = (id: string, isActive: boolean) => ({
    type: TOGGLE_FILTER_ISACTIVE,
    payload: {
        id,
        isActive,
    },
});

export const setTargetVariable: SimpleAction = (target: Variable | null) => ({
    type: SET_TARGET_VARIABLE,
    payload: target,
})

// -------------------- API callers --------------------

export const uploadSelectedFile = (...details) => {
    const types = [
        uploadStart,
        uploadSuccessAction,
        uploadErrorAction,
    ];

    return fetchActionHandler(types, Services.project.uploadFile, details);
}

export const generateIVsample = (...details: generateRequestPayload) => {
    const types = [
        generateStart,
        generateSuccessAction,
        generateErrorAction,
    ];

    return fetchActionHandler(types, Services.project.generateIVsample, details[0]);
}

// export const sendLoginAction = (...detials) => {
//     const types = [
//         loginStartAction,
//         loginSuccessAction,
//         loginErrorAction,
//     ];

//     return fetchActionHandler(types, Services.auth.fetchTestData, detials);
// };

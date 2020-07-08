import {
    SET_PROJECT_TITLE,
    SET_SELECTED_FILE,
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
    ADD_NEW_FILTER,
} from "../actions/actionTypes";
import { createReducer } from "../helpers";
import { StoreReducerSelector, ProjectState } from '../helpers/types';
import { initialProjectState } from "../helpers/store";

export const projectReducer = createReducer<ProjectState>({
    [SET_PROJECT_TITLE]: (state, { payload }) => ({
        ...state,
        editing: {
            ...state.editing,
            meta: {
                ...state.editing.meta,
                title: payload,
            }
        }
    }),
    [SET_SELECTED_FILE]: (state, { payload }) => ({
        ...state,
        editing: {
            ...state.editing,
            selectedFile: payload,
        }
    }),
    [UPLOAD_FILE]: (state, { payload }) => ({
        ...state,
        editing: {
            ...state.editing,
            selectedFile: payload,
        }
    }),
    [UPLOAD_FILE_SUCCESS]: (state, { payload }) => ({
        ...state,
        editing: {
            ...state.editing,
            selectedFile: payload,
        }
    }),
    [UPLOAD_FILE_ERROR]: (state, { payload }) => ({
        ...state,
        editing: {
            ...state.editing,
            selectedFile: payload,
        }
    }),
    [ADD_NEW_FILTER]: (state, { payload }) => ({
        ...state,
        editing: {
            ...state.editing,
            filters: [
                ...state.editing.filters,
                ...payload, // TODO
            ],
        }
    }),
}, initialProjectState);

export default projectReducer;

// ---------------------- Selectors ----------------------

const selectProjectState: StoreReducerSelector<ProjectState> = (s) => s.project;

export const getProjectTitle = (s) => selectProjectState(s).editing.meta.title;
export const getSelectedFile = (s) => selectProjectState(s).editing.selectedFile;
export const getVariables = (s) => selectProjectState(s).editing.variables;

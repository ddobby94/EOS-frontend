import {
    SET_PROJECT_TITLE,
    SET_SELECTED_FILE,
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
    ADD_NEW_FILTER,
    SET_TARGET_VARIABLE,
} from "../actions/actionTypes";
import { createReducer, START_LOADING, SET_ERROR } from "../helpers";
import { StoreReducerSelector, ProjectState } from '../helpers/types';
import { initialProjectState } from "../helpers/store";
import { EXPLORATORY_ANALYSIS_DATA_OBJECT } from "../../../__mocks__/exploratoryMocks";
import { Version } from "../../containers/_types/Project.types";

// reducer helpers

const uploadFileSuccess = (state: ProjectState, { payload }) => {
    const { response = {} } = payload;

    return {
        ...state,
        loading: false,
        editing: {
            ...state.editing,
            meta: {
                ...state.editing.meta,
                totalRecords: response.totalRecords,
                numberOfVariables: response.numberOfVariables,
                currentVersion: new Version(),
            },
            variables: response.variable || EXPLORATORY_ANALYSIS_DATA_OBJECT,
        }
    } as ProjectState;
}

// base reducers

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
        ...START_LOADING,
        editing: {
            ...state.editing,
            selectedFile: payload,
        }
    }),
    [UPLOAD_FILE_SUCCESS]: uploadFileSuccess,
    [UPLOAD_FILE_ERROR]: (state, { payload }) => ({
        ...state,
        ...SET_ERROR(payload),
    }),
    [SET_TARGET_VARIABLE]: (state, { payload }) => ({
        ...state,
        editing: {
            ...state.editing,
            meta: {
                ...state.editing.meta,
                targetVariable: payload,
            }
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
export const getTargetVariable = (s) => selectProjectState(s).editing.meta.targetVariable;

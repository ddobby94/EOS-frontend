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
} from "../actions/actionTypes";
import { createReducer, START_LOADING, SET_ERROR } from "../helpers";
import { StoreReducerSelector, ProjectState, PayloadType } from '../helpers/types';
import { initialProjectState } from "../helpers/store";
import { EXPLORATORY_ANALYSIS_DATA_OBJECT } from "../../../__mocks__/exploratoryMocks";
import { Version, Filter } from "../../containers/_types/Project.types";

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

const removeFilter = (state: ProjectState, { payload: filterToRemove }: PayloadType<string>) => {
    const filters = state.editing.filters.filter((v) => v.id !== filterToRemove);

    return {
        ...state,
        editing: {
            ...state.editing,
            filters: [
                ...filters,
            ],
        }
    };
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
    [ADD_NEW_FILTER]: (state, { payload }: PayloadType<Filter>) => ({
        ...state,
        editing: {
            ...state.editing,
            filters: [
                ...state.editing.filters,
                payload,
            ],
        }
    }),
    [REMOVE_FILTER]: removeFilter,
    [TOGGLE_FILTER_ISACTIVE]: (state, { payload }: PayloadType<{ id: string, isActive: boolean }>) => ({
        ...state,
        editing: {
            ...state.editing,
            filters: [
                ...state.editing.filters.map((v) => ({
                    ...v,
                    isActive: v.id === payload.id ? payload.isActive : v.isActive,
                })),
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
export const getProjectBaseData = (s) => selectProjectState(s).editing.meta;
export const getFilters = (s) => selectProjectState(s).editing.filters;

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
    OPEN_DATASET_AT_VERSION,
    OPEN_DATASET_AT_VERSION_SUCCESS,
    OPEN_DATASET_AT_VERSION_ERROR,
    RESET_EDITING_PROJECT,
} from "../actions/actionTypes";
import { createReducer, START_LOADING, SET_ERROR } from "../helpers";
import { StoreReducerSelector, ProjectState, PayloadType, SuccessPayload } from '../helpers/types';
import { initialProjectState } from "../helpers/store";
import { EXPLORATORY_ANALYSIS_DATA_OBJECT } from "../../../__mocks__/exploratoryMocks";
import { Filter, IVresults } from "../../containers/_types/Project.types";
import { IV_RESULTS_MOCK, NEW_VERSION_DATA_MOCK, MOCKED_LOADED_EDITING_OBJ } from "../../../__mocks__/preProcessingMocks";
import { REHYDRATE } from "redux-persist";



// reducer helpers

const uploadFileSuccess = (state: ProjectState, { payload }: SuccessPayload) => {
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
                currentVersion: -1,
            },
            variables: response.variable || EXPLORATORY_ANALYSIS_DATA_OBJECT,
        }
    } as ProjectState;
}

const generateSampleSuccess = (state: ProjectState, { payload }: SuccessPayload) => {
    const { response = {} } = payload;

    console.log(response);

    let IVresults: IVresults = response.IVresults || IV_RESULTS_MOCK;
    let newVersion: number = response.newVersion || NEW_VERSION_DATA_MOCK;

    const IVresultsObj = {};
    IVresults.forEach(({ variableId, IVvalue }) => IVresultsObj[variableId] = IVvalue);

    const variables = [...state.editing.variables.map((v) => {
        if (IVresultsObj[v.name] !== undefined) {
            v.IVvalue = IVresultsObj[v.name]
        }
        return {...v};
    })];

    return {
        ...state,
        loading: false,
        editing: {
            ...state.editing,
            meta: {
                ...state.editing.meta,
                currentVersion: newVersion,
            },
            variables,
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

const rehydrateEditing = (state: ProjectState, { payload }) => {
    if (payload && payload.editing) {
        return {
            ...state,
            editing: {
                ...state.editing,
                ...payload.editing,
            }
        }
    }
    return {...state};
}

const openVersion = (state: ProjectState, { payload }): ProjectState => {
    const IVresultsObj = {};
    IV_RESULTS_MOCK.forEach(({ variableId, IVvalue }) => IVresultsObj[variableId] = IVvalue);

    const variables = [...MOCKED_LOADED_EDITING_OBJ.variables.map((v) => {
        if (IVresultsObj[v.name] !== undefined) {
            v.IVvalue = IVresultsObj[v.name]
        }
        return {...v};
    })];

    return {
        ...state,
        loading: false,
        editing: {
            ...MOCKED_LOADED_EDITING_OBJ as ProjectState['editing'],
            variables,
        }
    }
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
    [UPLOAD_FILE_ERROR]: (state) =>  uploadFileSuccess(state, { payload: { response: {}, args: [] } }), // TODO REMOVEME!!!
    // [UPLOAD_FILE_ERROR]: (state, { payload }) => ({
    //     ...state,
    //     ...SET_ERROR(payload),
    // }),
    [OPEN_DATASET_AT_VERSION]: (state) => ({
        ...state,
        ...START_LOADING,
        editing: {
            ...state.editing,
            meta: {
                ...state.editing.meta,
                currentVersion: -1,
            }
        }
    }),
    [OPEN_DATASET_AT_VERSION_SUCCESS]: openVersion,
    [OPEN_DATASET_AT_VERSION_ERROR]: (state) =>  openVersion(state, { payload: { response: {}, args: [] } }), // TODO REMOVEME!!!
    [GENERATE_SAMPLE]: (state) => ({
        ...state,
        ...START_LOADING,
    }),
    [GENERATE_SAMPLE_SUCCESS]: generateSampleSuccess,
    [GENERATE_SAMPLE_ERROR]: (state, { payload }) => ({
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
    [RESET_EDITING_PROJECT]: (state) => ({
        ...state,
        editing: {
            ...initialProjectState.editing,
        }
    }),
    [REHYDRATE]: rehydrateEditing,
}, initialProjectState);

export default projectReducer;

// ---------------------- Selectors ----------------------

const selectProjectState: StoreReducerSelector<ProjectState> = (s) => s.project;

export const getProjectTitle = (s) => selectProjectState(s).editing.meta.title;
export const getSelectedFile = (s) => selectProjectState(s).editing.selectedFile;
export const getVariables = (s) => selectProjectState(s).editing.variables;
export const hasVariablesWithFineIV = (s) => selectProjectState(s).editing.variables.find((v) => v.IVvalue !== undefined);
export const getTargetVariable = (s) => selectProjectState(s).editing.meta.targetVariable;
export const getProjectBaseData = (s) => selectProjectState(s).editing.meta;
export const getProjectCurrentVersion = (s) => selectProjectState(s).editing.meta.currentVersion;
export const getFilters = (s) => selectProjectState(s).editing.filters;
export const getActiveFiltersList = (s) => selectProjectState(s).editing.filters.filter((f) => f.isActive);

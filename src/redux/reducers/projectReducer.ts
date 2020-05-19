import {
    SET_PROJECT_TITLE,
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
}, initialProjectState);

export default projectReducer;

// ---------------------- Selectors ----------------------

const selectProjectState: StoreReducerSelector<ProjectState> = (s) => s.project;

export const getProjectTitle = (s) => selectProjectState(s).editing.meta.title;

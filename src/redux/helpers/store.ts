import { AuthState, ProjectState } from './types';

export const initialAuthState: AuthState = {
    loading: false,
    error: null,
    user: {},
};

export const initialProjectState: ProjectState = {
    editing: {
        meta: {
            title: '',
            datasetName: '',
        }
    },
    previousProjects: {},
};

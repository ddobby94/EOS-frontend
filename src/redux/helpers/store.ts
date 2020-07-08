import { AuthState, ProjectState } from './types';

export const initialAuthState: AuthState = {
    loading: false,
    error: null,
    loggedIn: false,
    user: {},
};

export const initialProjectState: ProjectState = {
    editing: {
        meta: {
            title: '',
            datasetName: '',
        },
        filters: [],
        variables: {},
    },
    previousProjects: {},
};

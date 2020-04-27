import { 
    LOGIN_START, 
    LOGIN_START_SUCCESS, 
    LOGIN_START_ERROR,
} from "../actions/actionTypes";

interface AuthState {
    loading: boolean;
    error: string | null;
    user: {
        userId?: string;
    }
};

interface ReducerObject<T = AuthState> {
    [key: string]: (state: T, action) => T;
};

const initialState: AuthState = {
    loading: false,
    error: null,
    user: {},
};

const createReducer = (redObj: ReducerObject) => (state = initialState, action) => {
    try {
        return redObj[action.type](state, action);
    } catch (error) {
        return {
            ...state,
            error,
        };
    }
}

export const authReducer = createReducer({
    [LOGIN_START]: (state) => ({
        ...state,
        loading: true
    }),
    [LOGIN_START_SUCCESS]: (state, { payload }) => ({
        ...state,
        user: payload,
    }),
    [LOGIN_START_ERROR]: (state, { error }) => ({
        ...state,
        error,
    }),
});

// ---------------------- Selectors ---------------------- 

export const getAuth = (state: AuthState) => state.user;
export const getAuthLoading = (state: AuthState) => state.loading;
export const getAuthError = (state: AuthState) => state.error;

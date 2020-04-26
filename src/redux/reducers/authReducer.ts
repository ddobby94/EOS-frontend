import { 
    LOGIN_START, 
    LOGIN_START_SUCCESS, 
    LOGIN_START_ERROR,
} from "../actions/actionTypes";

const initialState = {
    loading: false,
    error: null,
    user: {},
};

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_START:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_START_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case LOGIN_START_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
}

export const getAuth = state => state.user;
export const getAuthPending = state => state.loading;
export const getAuthError = state => state.error;

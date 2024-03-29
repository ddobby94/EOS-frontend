import { FetchActionHandler, ReducerObject } from "./types";

export const handleSuccess = (dispatch, successFunction, response, args) => {
    if (response && response.error) {
        throw response.error;
    }

    return dispatch(successFunction(response, args));
}

export const handleError = (dispatch, errorFunction, errorResponse) => {
    let error;
    if (typeof errorResponse === 'string') {
        error = errorResponse
    } else {
        error = errorResponse.error || errorResponse.message;
    }

    return dispatch(errorFunction(error));
}

export const fetchActionHandler: FetchActionHandler = (types, serviceCall, args = []) => {
    const [request, fetchSuccess, fetchError] = types;

    return (dispatch) => {
        dispatch(request(...args));
        serviceCall(...args)
            .then((response) => handleSuccess(dispatch, fetchSuccess, response, args))
            .catch((error) => handleError(dispatch, fetchError, error));
    };
};

export const createReducer = <T>(redObj: ReducerObject<T>, initialState) => (state: T = initialState, action): T => {
    try {
        if (redObj[action.type] === undefined) {
            console.log({ action })
            return { ...state };
        }
        return redObj[action.type](state, action);
    } catch (error) {
        console.warn({ error });
        return {
            ...state,
            error,
        };
    }
}

export const START_LOADING = {
    loading: true,
    error: null,
};

export const SET_ERROR = (error) => ({
    loading: false,
    error,
});

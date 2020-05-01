import { FetchActionHandler, ReducerObject } from "./types";
import { initialState } from "./store";

export const handleSuccess = (dispatch, successFunction, response) => {
    if (response && response.error) {
      throw response.error;
    }
  
    return dispatch(successFunction(response));
  }
  
export const handleError = (dispatch, errorFunction, errorResponse) => {
    let error;
    if (typeof errorResponse === 'string') {
        error = errorResponse
    } else {
        error = errorResponse.error;
    }

    return dispatch(errorFunction(error));
}

export const fetchActionHandler: FetchActionHandler = (types, serviceCall, args = []) => {
    const [request, fetchSuccess, fetchError] = types;

    return (dispatch) => {
        dispatch(request(...args));
        serviceCall(...args)
            .then((response) => handleSuccess(dispatch, fetchSuccess, response))
            .catch((error) => handleError(dispatch, fetchError, error));
    };
};

export const createReducer = (redObj: ReducerObject) => (state = initialState, action) => {
    try {
        console.log({ redObj, TYPE: action.type, 'redObj[action.type]': redObj[action.type] })
        if (redObj[action.type] === undefined) {
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

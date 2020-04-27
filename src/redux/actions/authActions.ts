import { 
    LOGIN_START, 
    LOGIN_START_SUCCESS, 
    LOGIN_START_ERROR,
} from "./actionTypes";
import Services from '../../services';
import { SimpleObject } from '../../types/commonTypes';

type SimpleAction = () => SimpleObject;

export const loginStartAction: SimpleAction = () => ({
  type: LOGIN_START,
});

export const loginSuccessAction = (user) => ({
  type: LOGIN_START_SUCCESS,
  user,
});

export const loginErrorAction = (error) => ({
  type: LOGIN_START_ERROR,
  error,
});

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' |  'unshift'
type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> =
  Pick<TObj, Exclude<keyof TObj, ArrayLengthMutationKeys>>
  & {
    readonly length: L 
    [ I : number ] : T
    [Symbol.iterator]: () => IterableIterator<T>   
  }

interface serviceCallerActionObject {
  types: FixedLengthArray<string, 3>;
  
}


export const promiseAction: (serviceCallerActionObject) => {} = (obj) => {
  const [ServicesTAR, SUCCESS, ERROR] = obj.actions;
  console.log({ServicesTAR, SUCCESS, ERROR});
  return {};
}

// export const fetchAuthData = (a, b, c) => {
//   console.log({ a, b, c });
//   return (dispatch) => {
//     dispatch(loginStartAction());

//     fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then((res) => res.json())
//       .then((res) => {
//           if(res.error) {
//               throw(res.error);
//           }
//           dispatch(loginSuccessAction(res))
//           return res.products;
//       })
//       .catch(error => {
//           dispatch(loginErrorAction(error));
//       });
//   }
// };

const handleSuccess = (dispatch, successFunction, response) => {
  if (response && response.error) {
    throw response.error;
  }

  return dispatch(successFunction(response));
}

const handleError = (dispatch, errorFunction, errorResponse) => {
  let error;
  if (typeof errorResponse === 'string') {
    error = errorResponse
  } else {
    error = errorResponse.error;
  }

  return dispatch(errorFunction(error));
}

const fetchActionHandler = (types, serviceCall, args = []) => {
    const [request, fetchSuccess, fetchError] = types;

    return (dispatch) => {
      dispatch(request(...args));
      serviceCall(...args)
        .then((response) => handleSuccess(dispatch, fetchSuccess, response))
        .catch((error) => handleError(dispatch, fetchError, error));
    };
};


export const fetchAuthData = () => {
  const types: ((...args) => {})[] = [
    loginStartAction, 
    loginSuccessAction, 
    loginErrorAction,
  ];

  return fetchActionHandler(types, Services.auth.fetchTestData);
};















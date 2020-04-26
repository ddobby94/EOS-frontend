import { 
    LOGIN_START, 
    LOGIN_START_SUCCESS, 
    LOGIN_START_ERROR,
} from "./actionTypes";

export interface SimpleObject<T = any> {
  [key: string]: T,
};

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

export const fetchAuthData = () => {
  return (dispatch) => {
    dispatch(loginStartAction());

    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => res.json())
      .then((res) => {
          if(res.error) {
              throw(res.error);
          }
          dispatch(loginSuccessAction(res))
          return res.products;
      })
      .catch(error => {
          dispatch(loginErrorAction(error));
      });
  }
};

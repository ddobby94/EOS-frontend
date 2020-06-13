import * as ActionTypes from '../actions/actionTypes';
import reducer from './authReducer';
import { initialAuthState } from '../helpers/store';

describe('Reducers::AuthReducer', () => {
    const getStateWithOptions = (options = {}) => ({
        ...initialAuthState,
        ...options,
    });

  it('it should set the error state on unkown action', () => {
        const action = { type: 'unknown' };
        const expected = getStateWithOptions();

        expect(reducer(undefined, action)).toEqual(expected);
    });

  it(`it should set loading to true on ${ActionTypes.LOGIN_START}`, () => {
        const action = { type: ActionTypes.LOGIN_START };
        const expected = getStateWithOptions({ loading: true });

        expect(reducer(undefined, action)).toEqual(expected);
    });

  it(`it should set the error on ${ActionTypes.LOGIN_START_ERROR}`, () => {
        const error = 'User not existing';
        const action = { type: ActionTypes.LOGIN_START_ERROR, error };
        const expected = getStateWithOptions({
            error
        });

        expect(reducer(undefined, action)).toEqual(expected);
    });

//   it(`it should set the user on ${ActionTypes.LOGIN_START_SUCCESS}`, () => {
//         const payload = {
//             userId: 121,
//             name: 'fooo',
//         };
//         const action = { type: ActionTypes.LOGIN_START_SUCCESS, user: payload };
//         const expected = getStateWithOptions({
//             user: payload,
//         });

//         expect(reducer(undefined, action)).toEqual(expected);
//     });

});

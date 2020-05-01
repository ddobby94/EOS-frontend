import * as ActionTypes from '../actions/actionTypes';
import * as ActionCreators from './authActions';

describe('Actions', () => {
    it('Should create the loginStartAction', () => {
        const actual = ActionCreators.loginStartAction();
        const expected = {
            type: ActionTypes.LOGIN_START,
        };

        expect(actual).toEqual(expected);
    });

    it('Should create the loginSuccessAction', () => {
        const user = {
            userId: 123,
            name: 'foo',
        };
        const actual = ActionCreators.loginSuccessAction(user);
        const expected = {
            type: ActionTypes.LOGIN_START_SUCCESS,
            user,
        };

        expect(actual).toEqual(expected);
    });

    it('Should create the loginErrorAction', () => {
        const error = 'user not existing';
        const actual = ActionCreators.loginErrorAction(error);
        const expected = {
            type: ActionTypes.LOGIN_START_ERROR,
            error,
        };

        expect(actual).toEqual(expected);
    });
});

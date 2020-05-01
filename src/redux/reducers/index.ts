import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer.js';
import { authReducer } from './authReducer';
import { connectRouter } from 'connected-react-router'

const rootReducer = history => combineReducers({
    router: connectRouter(history),
    fuelSavings,
    authReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer'],
};

const rootReducer = history => {
    const rootRed = combineReducers({
        router: connectRouter(history),
        authReducer,
    });

    return persistReducer(persistConfig, rootRed);
};

export default rootReducer;
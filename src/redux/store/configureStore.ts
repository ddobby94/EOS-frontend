import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist'

export const history = createBrowserHistory();
const reactRouterMiddleware = routerMiddleware(history);
const BASE_MIDDLEWARES = [
    thunk,
    reactRouterMiddleware,
    logger,
];

const configureStore = (initialState = {}) => {
    const middlewares = [
        ...BASE_MIDDLEWARES,
    ];

    const store = createStore(
        createRootReducer(history), // root reducer with router state
        initialState,
        compose(applyMiddleware(...middlewares))
    );

    const persistor = persistStore(store);

    return {
        store,
        persistor,
    };
}

export default configureStore;

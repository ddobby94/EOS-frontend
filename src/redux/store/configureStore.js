import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist'

export const history = createBrowserHistory();
const connectRouterHistory = connectRouter(history);
const reactRouterMiddleware = routerMiddleware(history);
const BASE_MIDDLEWARES = [
    thunk,
    reactRouterMiddleware,
    logger,
];

function configureStoreProd(initialState) {
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

function configureStoreDev(initialState) {
    const middlewares = [
        reduxImmutableStateInvariant(),
        ...BASE_MIDDLEWARES,
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        createRootReducer(history),
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(connectRouterHistory(nextRootReducer));
        });
    }

    const persistor = persistStore(store);

    return {
        store,
        persistor,
    };
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;

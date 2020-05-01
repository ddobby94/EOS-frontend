import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import logger from 'redux-logger';


// persist store:  https://www.npmjs.com/package/redux-persist
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

    return createStore(
        createRootReducer(history), // root reducer with router state
        initialState,
        compose(applyMiddleware(...middlewares))
    );
}

function configureStoreDev(initialState) {
    const middlewares = [
        reduxImmutableStateInvariant(),
        ...BASE_MIDDLEWARES,
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const store = createStore(
        createRootReducer(history), // root reducer with router state
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    );

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(connectRouterHistory(nextRootReducer));
        });
    }

    return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;

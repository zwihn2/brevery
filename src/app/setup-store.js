import 'babel-polyfill';

import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';

import appConf from 'app/conf';
import rootSaga from 'sagas';
import rootReducer from 'reducers';

export const getComposeEnhancers = () => {
    const isUsingDevTools = appConf.environment !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (isUsingDevTools) {
        return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize..
        });
    }
    return compose;
};

const setupStore = initialState => {
    const composeEnhancers = getComposeEnhancers();
    const sagaMiddleware = createSagaMiddleware();
    const middleWares = [reduxImmutableStateInvariant(), sagaMiddleware];

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleWares)),
    );
    sagaMiddleware.run(rootSaga);

    return store;
};

export default setupStore;

import { createStore, applyMiddleware, compose } from 'redux';
import { install, combineReducers } from 'redux-loop';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers';

const logger = createLogger({
    stateTransformer: state => state.toJS(),
    predicate: () => process.env.NODE_ENV === 'development',
});

const rootReducer = combineReducers(
    reducers,
    Map(),
    (child, key) => child.get(key),
    (child, key, value) => child.set(key, value)
);

const initialState = rootReducer(Map(), {
    type: '@@CLIENT_INIT',
});

export default () => createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk),
    install(),
    applyMiddleware(logger)
));

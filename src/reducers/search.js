import { Map, List } from 'immutable';
import { getKeys } from '../effects/api';
import { Effects, loop } from 'redux-loop';
import { FETCH_KEYS_SUCCESS } from '../actions/search';

const initialState = loop(
    Map(),
    Effects.promise(getKeys)
);

export default function search(state = initialState, action) {
    switch (action.type) {
        case FETCH_KEYS_SUCCESS:
            return state.set('keys', List(action.keys));
        default:
            return state;
    }
}

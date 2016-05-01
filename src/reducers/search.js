import { Map, List } from 'immutable';
import { getFeatures } from '../effects/api';
import { Effects, loop } from 'redux-loop';
import { FETCH_KEYS_SUCCESS, SELECT_KEY } from '../actions/search';

const initialState = loop(
    Map(),
    Effects.promise(getFeatures)
);

export default function search(state = initialState, action) {
    switch (action.type) {
        case SELECT_KEY:
            return state.set('selectedFeature', action.key);
        case FETCH_KEYS_SUCCESS:
            return state.set('features', List(action.keys));
        default:
            return state;
    }
}

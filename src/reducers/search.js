import { Map, List } from 'immutable';
import { FETCH_KEYS_SUCCESS, SELECT_KEY } from '../actions/search';

export default function search(state = Map(), action) {
    switch (action.type) {
        case SELECT_KEY:
            return state.set('selectedFeature', action.key);
        case FETCH_KEYS_SUCCESS:
            return state.set('features', List(action.keys));
        default:
            return state;
    }
}

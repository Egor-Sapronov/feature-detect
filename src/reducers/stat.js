import { Map, List, fromJS } from 'immutable';
import { FETCH_ALL_STAT_SUCCESS, FETCH_STAT_SUCCESS } from '../actions/stat';

export default function search(state = Map(), action) {
    switch (action.type) {
        case FETCH_STAT_SUCCESS:
            return state.set('currentStat', fromJS(action.stat));
        case FETCH_ALL_STAT_SUCCESS:
            return state.set('stats', List(action.stat));
        default:
            return state;
    }
}

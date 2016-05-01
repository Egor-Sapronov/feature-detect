import { Map, List, fromJS } from 'immutable';
import { getStat, getAllStat } from '../effects/api';
import { Effects, loop } from 'redux-loop';
import { SELECT_KEY } from '../actions/search';
import { FETCH_ALL_STAT_SUCCESS, FETCH_STAT_SUCCESS } from '../actions/stat';

const initialState = loop(
    Map(),
    Effects.promise(getAllStat)
);

export default function search(state = initialState, action) {
    switch (action.type) {
        case FETCH_STAT_SUCCESS:
            return state.set('currentStat', fromJS(action.stat));
        case FETCH_ALL_STAT_SUCCESS:
            return state.set('stats', List(action.stat));
        case SELECT_KEY:
            return loop(
                state,
                Effects.promise(getStat, action.key)
            );
        default:
            return state;
    }
}

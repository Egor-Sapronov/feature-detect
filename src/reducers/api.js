import { getFeatures, getAllStat, getStat } from '../effects/api';
import { Effects, loop } from 'redux-loop';
import { Map } from 'immutable';
import { SELECT_KEY } from '../actions/search';

const initialState = loop(
    Map({
        token: window.API_TOKEN, // TODO: don't use global vars
    }),
    Effects.batch([
        Effects.promise(getAllStat, window.API_TOKEN),
        Effects.promise(getFeatures, window.API_TOKEN),
    ])
);

export default function search(state = initialState, action) {
    switch (action.type) {
        case SELECT_KEY:
            return loop(
                state,
                Effects.promise(getStat, state.get('token'), action.key)
            );
        default:
            return state;
    }
}

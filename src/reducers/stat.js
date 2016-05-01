import { Map } from 'immutable';
import { getStat } from '../effects/api';
import { Effects, loop } from 'redux-loop';
import { SELECT_KEY } from '../actions/search';

export default function search(state = Map(), action) {
    switch (action.type) {
        case SELECT_KEY:
            return loop(
                state,
                Effects.promise(getStat, action.key)
            );
        default:
            return state;
    }
}

import * as api from '../io/api';
import { fetchKeysSuccess } from '../actions/search';
import { fetchAllStatSuccess } from '../actions/stat';

export function getFeatures(token) {
    return api.getFeaturesKeys(token).then(fetchKeysSuccess);
}

export function getAllStat(token) {
    return api.getStat(token).then(fetchAllStatSuccess);
}

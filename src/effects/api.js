import * as api from '../io/api';
import { fetchKeysSuccess } from '../actions/search';
import { fetchStatSuccess, fetchAllStatSuccess } from '../actions/stat';

export function getFeatures(token) {
    return api.getFeaturesKeys(token).then(fetchKeysSuccess);
}

export function getStat(token, feature) {
    return api.getFeaturesStat(token, feature).then(fetchStatSuccess);
}

export function getAllStat(token) {
    return api.getStat(token).then(fetchAllStatSuccess);
}

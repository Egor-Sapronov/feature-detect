import * as api from '../io/api';
import { fetchKeysSuccess } from '../actions/search';
import { fetchStatSuccess, fetchAllStatSuccess } from '../actions/stat';

export function getFeatures() {
    return api.getFeaturesKeys().then(fetchKeysSuccess);
}

export function getStat(feature) {
    return api.getFeaturesStat(feature).then(fetchStatSuccess);
}

export function getAllStat() {
    return api.getStat().then(fetchAllStatSuccess);
}

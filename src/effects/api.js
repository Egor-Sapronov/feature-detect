import { getFeaturesKeys, getFeaturesStat } from '../io/api';
import { fetchKeysSuccess } from '../actions/search';
import { fetchStatSuccess } from '../actions/stat';

export function getKeys() {
    return getFeaturesKeys().then(fetchKeysSuccess);
}

export function getStat(feature) {
    return getFeaturesStat(feature).then(fetchStatSuccess);
}

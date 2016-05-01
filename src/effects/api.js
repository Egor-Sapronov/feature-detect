import { getFeaturesKeys } from '../io/api';
import { fetchKeysSuccess } from '../actions/search';

export function getKeys() {
    return getFeaturesKeys().then(fetchKeysSuccess);
}

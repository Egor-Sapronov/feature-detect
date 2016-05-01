export const FETCH_KEYS = 'FETCH_KEYS';
export const FETCH_KEYS_SUCCESS = 'FETCH_KEYS_SUCCESS';
export const SELECT_KEY = 'SELECT_KEY';

export function selectKey(key) {
    return {
        type: SELECT_KEY,
        key,
    };
}

export function fetchKeys() {
    return {
        type: FETCH_KEYS,
    };
}

export function fetchKeysSuccess(keys) {
    return {
        type: FETCH_KEYS_SUCCESS,
        keys,
    };
}

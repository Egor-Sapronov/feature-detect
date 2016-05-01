export const FETCH_KEYS = 'FETCH_KEYS';
export const FETCH_KEYS_SUCCESS = 'FETCH_KEYS_SUCCESS';

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

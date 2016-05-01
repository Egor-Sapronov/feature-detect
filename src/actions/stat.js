export const FETCH_STAT_SUCCESS = 'FETCH_STAT_SUCCESS';
export const FETCH_ALL_STAT_SUCCESS = 'FETCH_ALL_STAT_SUCCESS';

export function fetchStatSuccess(stat) {
    return {
        type: FETCH_STAT_SUCCESS,
        stat,
    };
}

export function fetchAllStatSuccess(stat) {
    return {
        type: FETCH_ALL_STAT_SUCCESS,
        stat,
    };
}

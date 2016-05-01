export const FETCH_STAT_SUCCESS = 'FETCH_STAT_SUCCESS';

export function fetchStatSuccess(stat) {
    return {
        type: FETCH_STAT_SUCCESS,
        stat,
    };
}

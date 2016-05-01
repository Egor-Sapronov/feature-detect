import { createSelector } from 'reselect';

const getSearchState = state => state.get('search');

export default createSelector(getSearchState, search => search.toJS());

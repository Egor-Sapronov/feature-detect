import { createSelector } from 'reselect';
import { calculateStats } from '../../utils';
import { List } from 'immutable';

const getSelectedFeature = state => state.getIn(['stat', 'currentStat']);
const getAllStats = state => state.getIn(['stat', 'stats']);

export default createSelector(
    getSelectedFeature,
    getAllStats,
    (currentStat, stats = List()) => {
        const feature = currentStat && currentStat.toJS();
        const isCurrentStat = !!currentStat;
        const calculatedStats = stats.toJS().map(calculateStats);

        if (!isCurrentStat) {
            return { isCurrentStat, calculatedStats };
        }

        return {
            calculatedStats,
            isCurrentStat: !!currentStat,
            currentStat: calculateStats(feature),
        };
    }
);

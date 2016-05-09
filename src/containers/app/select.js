import { createSelector } from 'reselect';
import { calculateStats } from '../../utils';
import { List } from 'immutable';

const getSelectedFeature = state => state.getIn(['search', 'selectedFeature']);
const getAllStats = state => state.getIn(['stat', 'stats']);

export default createSelector(
    getSelectedFeature,
    getAllStats,
    (currentStat = '', stats = List()) => {
        const calculatedStats = stats
            .toJS()
            .filter(item => item._id.toLowerCase().includes(currentStat.toLowerCase()))
            .map(calculateStats);

        return {
            calculatedStats,
        };
    }
);

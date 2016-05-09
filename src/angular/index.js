import angular from 'angular';
import createStore from '../store/configureStore';
import appSelect from '../containers/app/select';
import searchSelect from '../containers/search/select';
import { selectKey } from '../actions/search';

export default angular.module('feature', [])
    .service('store', () => {
        const store = createStore();

        return store;
    })
    .controller('featuresController', function featuresController($scope, store) {
        const vm = this;
        const { subscribe, dispatch, getState } = store;

        vm.onSelect = () => dispatch(selectKey(vm.selectedItem));

        subscribe(() => {
            const state = getState();

            $scope.$evalAsync(() => {
                vm.features = searchSelect(state).features;
                vm.isCurrentStat = appSelect(state).isCurrentStat;
                vm.calculatedStats = appSelect(state).calculatedStats;
                vm.currentStat = appSelect(getState()).currentStat;
            });
        });
    });

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Search from '../search/search';
import StatBar from '../../components/statBar/statBar';
import StatLine from '../../components/statLine/statLine';
import select from './select';

export class App extends Component { // eslint-disable-line
    static propTypes = {
        isCurrentStat: PropTypes.bool.isRequired,
        calculatedStats: PropTypes.array.isRequired,
        currentStat: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            top: PropTypes.number.isRequired,
            bottom: PropTypes.number.isRequired,
        }),
    };

    render() {
        return (
            <div>
                <Search />
                { !this.props.isCurrentStat && <StatLine stats={ this.props.calculatedStats } /> }
                { this.props.isCurrentStat && <StatBar
                  top={ this.props.currentStat.top }
                  bottom={ this.props.currentStat.bottom }
                /> }
            </div>
        );
    }
}

export default connect(select)(App);

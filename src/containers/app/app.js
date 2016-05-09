import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Search from '../search/search';
import StatLine from '../../components/statLine/statLine';
import select from './select';

export class App extends Component { // eslint-disable-line
    static propTypes = {
        calculatedStats: PropTypes.array.isRequired,
    };

    render() {
        const { calculatedStats } = this.props;

        return (
            <div>
                <Search />
                <a href="/logout">Logout</a>
                <StatLine stats={ calculatedStats } />
            </div>
        );
    }
}

export default connect(select)(App);

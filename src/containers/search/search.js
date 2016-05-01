import React, { Component, PropTypes } from 'react';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux';
import select from './select';

export class Search extends Component { // eslint-disable-line
    static propTypes = {
        keys: PropTypes.array,
    };

    static defaultProps = {
        keys: [],
    }

    render() {
        return (
            <div>
                <Autocomplete
                  items={ this.props.keys }
                  getItemValue={ (item) => item }
                  value=""
                  renderItem={ (item) => <div key={ item }>{ item }</div> }
                />
            </div>
        );
    }
}

export default connect(select)(Search);

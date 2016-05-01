import React, { Component, PropTypes } from 'react';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux';
import { selectKey } from '../../actions/search';
import select from './select';

export function shouldItemRender(key, inputValue) {
    return key.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
}

export class Search extends Component {
    static propTypes = {
        keys: PropTypes.array,
        handleSelectKey: PropTypes.func.isRequired,
        selectedKey: PropTypes.string,
    };

    static defaultProps = {
        keys: [],
        selectedKey: '',
    }

    render() {
        return (
            <Autocomplete
              items={ this.props.keys }
              value={ this.props.selectedKey }
              shouldItemRender={ shouldItemRender }
              getItemValue={ item => item }
              onSelect={ this.props.handleSelectKey }
              renderItem={ (item) => <div key={ item }>{ item }</div> }
            />
        );
    }
}

export default connect(select, { handleSelectKey: selectKey })(Search);

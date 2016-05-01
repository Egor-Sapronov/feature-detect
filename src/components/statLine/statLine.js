import React, { PropTypes } from 'react';
import styles from './statLine.css';
import StatBar from '../statBar/statBar';

export default function StatLine({ stats }) {
    return (
        <div className={ styles.line }>
            { stats.map(item =>
                <div key={ item._id }>
                    <p>{ item._id }</p>
                    <StatBar
                      top={ item.top }
                      bottom={ item.bottom }
                    />
                </div>
            ) }
        </div>
    );
}

StatLine.propTypes = {
    stats: PropTypes.array,
};

StatLine.defaultProps = {
    stats: [],
};

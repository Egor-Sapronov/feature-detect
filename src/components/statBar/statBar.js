import React, { PropTypes } from 'react';
import styles from './statBar.css';

export default function StatBar({ top, bottom }) {
    return (
        <div className={ styles.bar }>
            { top > 0 && <div
              className={ styles.isFeature }
              style={ {
                  flexGrow: top,
              } }
            >
                { top }
            </div> }
            { bottom > 0 && <div
              className={ styles.noFeature }
              style={ {
                  flexGrow: bottom,
              } }
            >
                { bottom }
            </div> }
        </div>
    );
}

StatBar.propTypes = {
    top: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
};

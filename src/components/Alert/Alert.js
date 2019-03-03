import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Alert = (props) => {
  return (
    <React.Fragment>
      {
        props.label.length > 0 &&
        <div className={
            "alert alert-" +
            props.type +
            (props.center ? ' mui--text-center' : '')
          }
        >
          {props.label}
        </div>
      }
    </React.Fragment>
  );
}

Alert.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  center: PropTypes.bool
}

Alert.defaultProps = {
  type: 'danger',
  label: '',
  center: false
}

export default Alert;

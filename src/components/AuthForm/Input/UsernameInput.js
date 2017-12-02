import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'muicss/react';

const UsernameInput = (props) => {
  return (
    <Input
      label="Username"
      type="text"
      autoComplete="off"
      floatingLabel={true}
      required={true}
      onChange={props.onUsernameChange}
    />
  );
}

UsernameInput.propTypes = {
  onUsernameChange: PropTypes.func.isRequired
}

export default UsernameInput;

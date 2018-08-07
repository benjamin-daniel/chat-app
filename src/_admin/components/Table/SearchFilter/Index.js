import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'muicss/react';
import './styles.scss';

const SearchFilter = (props) => {
  return (
    <div className="search-filter">
      <div className="search-icon">
        <FontAwesomeIcon icon="search" />
      </div>
      <Input
        type="text"
        autoComplete="off"
        floatingLabel={false}
        placeholder={props.placeholder}
        onChange={props.onSearchFilterChange}
      />
    </div>
  );
}

SearchFilter.propTypes = {
  onSearchFilterChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

SearchFilter.defaultProps = {
  placeholder: 'Search'
}

export default SearchFilter;
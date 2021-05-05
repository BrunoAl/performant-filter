import React from 'react';
import PropTypes from 'prop-types';
import styles from './filterButton.module.css';

export default function FilterButton({ isSelected, onClick, text }) {
  return (
    <button className={`${styles.button} } ${isSelected ? styles['button--active'] : null}`} onClick={onClick}>
      {text}
    </button>
  );
}

FilterButton.defaultProps = {
  isSelected: false,
};

FilterButton.propTypes = {
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

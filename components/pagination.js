import React from 'react';
import PropTypes from 'prop-types';
import styles from './pagination.module.css';

export default function Pagination({ numberOfPages, onSetPage, selectedPage }) {
  if (numberOfPages <= 1) return null;
  return (
    <ul className={styles.pagination}>
      {Array(numberOfPages)
        .fill(null)
        .map((_, index) => (
          <button
            className={`${styles.pagination__button} ${
              selectedPage === index + 1 && styles['pagination__button--active']
            }`}
            key={index}
            onClick={() => onSetPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
    </ul>
  );
}

Pagination.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  onSetPage: PropTypes.func.isRequired,
  selectedPage: PropTypes.string.isRequired,
};

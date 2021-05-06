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
          <li key={index} className={styles.pagination__button}>
            <button
              className={`${selectedPage === index + 1 && styles['pagination__button--active']}`}
              onClick={() => onSetPage(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
    </ul>
  );
}

Pagination.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  onSetPage: PropTypes.func.isRequired,
  selectedPage: PropTypes.string.isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './priceRange.module.css';

export default function PriceRange({ onSubmit }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  function onMinPriceChange(e) {
    e.preventDefault();
    setMinPrice(e.target.value);
  }

  function onMaxPriceChange(e) {
    e.preventDefault();
    setMaxPrice(e.target.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <h3 className={styles['filter__range-title']}>Price range</h3>
      <label className={styles['filter__price-label']}>
        from:
        <input
          min="0"
          className={styles['filter__price-input']}
          type="number"
          value={minPrice}
          onChange={onMinPriceChange}
        ></input>
      </label>
      <label className={styles['filter__price-label']}>
        to:
        <input
          min={minPrice || 0}
          className={styles['filter__price-input']}
          type="number"
          value={maxPrice}
          onChange={onMaxPriceChange}
        ></input>
      </label>
      <button type="submit">Filter</button>
    </form>
  );
}

PriceRange.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

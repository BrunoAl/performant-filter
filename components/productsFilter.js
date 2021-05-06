import React from 'react';
import PropTypes from 'prop-types';
import styles from './productsFilter.module.css';
import PriceRange from './priceRange';
import FilterButton from './filterButton';

export default function ProductsFilter({
  filters,
  onChangeColor,
  onChangeCategory,
  onChangeMinValue,
  onChangeMaxValue,
  selectedCategory,
  selectedColor,
  selectedMinValue,
  selectedMaxValue,
}) {
  function onPriceRangeSubmit(e) {
    e.preventDefault();
    onChangeMinValue(e.target[0].value || '');
    onChangeMaxValue(e.target[1].value || '');
  }

  return (
    <div className={styles.filter}>
      <div>
        <h2 className={styles['filter__colors-title']}>Colors</h2>
        <FilterButton isSelected={selectedColor === ''} onClick={() => onChangeColor('')} text="All" />
        {filters.colors.map(color => (
          <FilterButton
            key={color}
            isSelected={selectedColor === color}
            onClick={() => onChangeColor(color)}
            text={color}
          />
        ))}
      </div>

      <div>
        <h2 className={styles['filter__categories-title']}>Categories</h2>
        <FilterButton isSelected={selectedCategory === ''} onClick={() => onChangeCategory('')} text="All" />
        {filters.categories.map(category => (
          <FilterButton
            key={category}
            isSelected={selectedCategory === category}
            onClick={() => onChangeCategory(category)}
            text={category}
          />
        ))}
      </div>
      <PriceRange onSubmit={onPriceRangeSubmit} min={selectedMinValue} max={selectedMaxValue} />
    </div>
  );
}

ProductsFilter.propTypes = {
  filters: PropTypes.shape({
    colors: PropTypes.arrayOf(PropTypes.string),
    categories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onChangeColor: PropTypes.func.isRequired,
  onChangeCategory: PropTypes.func.isRequired,
  onChangeMinValue: PropTypes.func.isRequired,
  onChangeMaxValue: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  selectedColor: PropTypes.string.isRequired,
  selectedMinValue: PropTypes.string.isRequired,
  selectedMaxValue: PropTypes.string.isRequired,
};

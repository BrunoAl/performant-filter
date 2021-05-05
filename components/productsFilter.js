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
}) {
  function onPriceRangeSubmit(e) {
    e.preventDefault();
    onChangeMinValue(e.target[0].value || '');
    onChangeMaxValue(e.target[1].value || '');
  }

  return (
    <div className={styles.filter}>
      <div>
        <h3 className={styles['filter__colors-title']}>Colors</h3>
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
        <h3 className={styles['filter__categories-title']}>Categories</h3>
        <FilterButton isSelected={selectedCategory === ''} onClick={() => onChangeColor('')} text="All" />
        {filters.categories.map(category => (
          <FilterButton
            key={category}
            isSelected={selectedCategory === category}
            onClick={() => onChangeCategory(category)}
            text={category}
          />
        ))}
      </div>
      <PriceRange onSubmit={onPriceRangeSubmit} />
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
};
